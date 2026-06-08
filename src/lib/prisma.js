import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
let prismaInstance;

function getPrisma() {
  if (!prismaInstance) {
    if (process.env.NODE_ENV === 'production') {
      prismaInstance = new PrismaClient();
    } else {
      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient();
      }
      prismaInstance = globalForPrisma.prisma;
    }
  }
  return prismaInstance;
}

const prisma = new Proxy({}, {
  get(target, prop) {
    return getPrisma()[prop];
  }
});

export default prisma;
