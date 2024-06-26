'use server'

import { z } from 'zod';
import { getUserByEmail } from '../../app/lib/database';
import { createCipheriv, createHash, randomBytes } from 'crypto';
import { createUser } from '../../app/lib/database';
import { createSession } from '../../app/lib/session';
import { redirect } from 'next/navigation';

export async function signUp(prevState: any, formData: FormData) {
  const parsedCredentials = z
    .object({ 
      firstName: z.string().min(2),
      lastName: z.string().optional(),
      email: z.string().email(),
      password: z.string().min(6) 
    })
    .safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // If any form fields are invalid, return early
    if (!parsedCredentials.success) {
      return {
        errors: parsedCredentials.error.flatten().fieldErrors,
      }
    }

    const { email, password, firstName, lastName } = parsedCredentials.data;

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        message: 'User already exists. Please sign in.'
      }
    }
    
    const key = createHash('sha256').update(String(email)).digest('base64').slice(0, 24);
    const cipher = createCipheriv('aes-192-cbc', key, Buffer.from('a1b2c3d4e5f6g7h8'));
    const encryptedPassword = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

    // Create the user
    const user = await createUser(firstName + ' ' + lastName, email, encryptedPassword);
    if (!user) {
      return {
        message: 'Failed to create user. Please try again.'
      }
    }

    await createSession(user.id);

    redirect('/home');
}