import { PrismaClient } from '@prisma/users';

const prisma = new PrismaClient();

async function cleanDB() {
  await prisma.$connect();
  await prisma.$transaction([
    prisma.role_Permission.deleteMany(),
    prisma.user_Role.deleteMany(),
    prisma.user.deleteMany(),
    prisma.role.deleteMany(),
    prisma.permission.deleteMany(),
  ]);
  await prisma.$disconnect();
}

cleanDB();
