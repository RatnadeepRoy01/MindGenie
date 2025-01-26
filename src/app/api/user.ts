import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const auth = getAuth(req);

      if (auth.user) {
        const user = auth.user;

        const existingUser = await prisma.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              clerkId: user.id,
              email: user.emailAddresses[0].emailAddress,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          });
          return res.status(200).json(newUser);
        }

        return res.status(200).json(existingUser);
      } else {
        return res.status(401).json({ message: 'User not authenticated' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
