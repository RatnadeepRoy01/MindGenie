// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ensuring that prisma client is only instantiated once during development
if (process.env.NODE_ENV === 'development') {
  global.prisma = global.prisma || prisma;
}

export default prisma;
