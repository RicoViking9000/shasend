'use server';

import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { createChannel, createMessage, createMessageAndAddToChannel, getMessagesByChannel, getUser, getUserByEmail, prisma } from './database';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import React from 'react';
import { Message, PaneState, b_Message } from '../components/MessagePane';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function handleCreateChannel(
  prevState: any,
  formData: FormData
) {
  try {
    const parsedCredentials = z
      .object({ email: z.string().min(2) })
      .safeParse({
        email: formData.get('email'),
      });

    if (!parsedCredentials.success) {
      return {
        errors: parsedCredentials.error.flatten().fieldErrors,
      };
    }

    const { email } = parsedCredentials.data;
    const recipient = await getUserByEmail(email);
    if (!recipient) {
      return {
        message: 'User not found.',
      };
    }

    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)
    const userID: any = session?.userId
    const user = await getUser(userID)
    if (!user) {
      return {
        message: 'Issue retrieving your information.',
      };
    }

    const channel = await createChannel([
      recipient.id,
      user.id,
    ]);

    for (const account of [recipient, user]) {
      await prisma.user.update({
        where: {
          id: account.id,
        },
        data: {
          channels: {
            connect: {
              id: channel.id,
            },
          },
        },
      });
    }

    return 'success';


  } catch (error) {
    console.error('Failed to create channel:', error);
    return 'Failed to create channel: ' + error;
  }
}

export async function handleSendMessage(
  prevState: PaneState | any,
  formData: FormData | any,
) {
  const parsedCredentials = z
    .object({ 
      content: z.string().min(1),
      })
    .safeParse({
      content: formData.get('message'),
    });
  
    if (!parsedCredentials.success) {
      console.log(parsedCredentials.error.flatten().fieldErrors)
    return {
      messages: prevState.messages,
      user: prevState.user,
      channelID: prevState.channelID,
      errors: parsedCredentials.error.flatten().fieldErrors,
    };
  }

  const { content } = parsedCredentials.data;

  // const user = await getUserByEmail(prevState.email);
  const user = prevState.user;

  const key = createHash('sha256').update(String(user?.id)).digest('base64').slice(0, 24);
  const cipher = createCipheriv('aes-192-cbc', key, Buffer.from('a1b2c3d4e5f6g7h8'));
  const encrypted = cipher.update(content, 'utf8', 'hex') + cipher.final('hex');

  const message = await createMessageAndAddToChannel(
    user?.id || '',
    prevState.channelID,
    encrypted,
  );

  // redirect(`/channels/${prevState.channelID}`);
  return {
    messages: [...prevState.messages, message],
    email: prevState.email,
    channelID: prevState.channelID,
    errors: {},
  };
}

export async function getAndDecryptMessages(channelID: string) {
  noStore()
  const messageData: b_Message[] = await getMessagesByChannel(channelID);
  const decryptedMessages = await Promise.all(messageData.map(async message => {
    const user = await getUser(message.authorID);
    const key = createHash('sha256').update(String(user?.id)).digest('base64').slice(0, 24);
    const decipher = createDecipheriv('aes-192-cbc', key, Buffer.from('a1b2c3d4e5f6g7h8'));
    const decrypted = decipher.update(message.content || '', 'hex', 'utf8') + decipher.final('utf8');
    return {
      ...message,
      content: decrypted,
    };
  }));
  const messagesWithMappedAuthors = await Promise.all(decryptedMessages.map(async message => {
    const author = await getUser((message).authorID);
    return {
      ...message,
      authorName: author?.name || 'Unknown',
    };
  }));
  return messagesWithMappedAuthors;
}