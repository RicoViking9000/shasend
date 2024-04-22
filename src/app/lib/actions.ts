'use server';

import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { createChannel, getUser, getUserByEmail, prisma } from './database';
import { cookies } from 'next/headers';
import { decrypt } from './session';
 
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

    // redirect(`/channels/${channel.id}`);

    return 'success';


  } catch (error) {
    console.error('Failed to create channel:', error);
    return 'Failed to create channel: ' + error;
  }
}