import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import google from 'next-auth/providers/google';
import discord from 'next-auth/providers/discord';
import { getUserByEmail } from './app/lib/database';
import { Cipher, createCipheriv, createDecipheriv, createHash } from 'crypto';
import { createUser } from './app/lib/database';
import { createSession, getSession } from './app/lib/session';
import { redirect } from 'next/navigation';
// import { sql } from '@vercel/postgres';
// import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';
 
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// async function getUser(email: string): Promise<any> {

//   return {
//     email: 'email@example.com',
//     name: 'John Doe',
//     image: 'https://example.com/image.png',
//     password: 'password',
//   };
// }


export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUserByEmail(email);
            if (!user) return null;

            const key = createHash('sha256').update(String(email)).digest('base64').slice(0, 24);
            const decipher = createDecipheriv('aes-192-cbc', key, Buffer.from('a1b2c3d4e5f6g7h8'));
            const decryptedPassword = user.password ? decipher.update(user.password, 'hex', 'utf8') + decipher.final('utf8') : '';
            const passwordsMatch = password === decryptedPassword;

            // refresh session if invalid
            try {
              getSession();
            } catch (error) {
              await createSession(user.id);
            }

            if (passwordsMatch) return user;
          }

          console.log('Invalid credentials');
          return null;
        },
    }),
    google,
    discord,
  ],
});