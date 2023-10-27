import {
  PrismaClient,
  User,
  Role,
  Permission,
  Role_Permission,
  User_Role,
} from '@prisma/users';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function seed() {
  await prisma.$connect();
  await prisma.$transaction([
    prisma.role_Permission.deleteMany(),
    prisma.user_Role.deleteMany(),
    prisma.user.deleteMany(),
    prisma.role.deleteMany(),
    prisma.permission.deleteMany(),
  ]);

  const users: User[] = [];
  const roles: Role[] = [];
  const permissions: Permission[] = [];
  const role_permissions: Role_Permission[] = [];
  const user_roles: User_Role[] = [];

  for (let i = 0; i < 10; i++) {
    const hashPassword = await hash('123456', 10);
    users.push({
      id: randomUUID(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashPassword,
      status: true,
      phone: faker.phone.number('501-###-####'),
      createdAt: new Date(),
    });
  }

  for (let i = 0; i < 5; i++) {
    const defaultRoles = ['SUPERADMIN', 'ADMINISTRATION'];
    roles.push({
      id: randomUUID(),
      name: defaultRoles[i],
      description: defaultRoles[i],
      slug: defaultRoles[i].toLowerCase(),
      status: true,
      createdAt: new Date(),
    });
  }

  for (let i = 0; i < 4; i++) {
    const defaultSubjects = ['USERS', 'ROLES', 'PERMISSIONS'];
    const defaultActions = ['manage', 'create', 'read', 'update', 'delete'];
    permissions.push({
      id: randomUUID(),
      name: defaultSubjects[i],
      description: defaultSubjects[i],
      slug: defaultSubjects[i].toLowerCase(),
      action: defaultActions[i],
      subject: defaultSubjects[i],
      status: true,
      createdAt: new Date(),
    });
  }

  for (let i = 0; i < 5; i++) {
    role_permissions.push({
      id: randomUUID(),
      role_id: roles[i].id,
      permission_id: permissions[i]?.id ?? permissions[0].id,
    });
  }

  for (let i = 0; i < 10; i++) {
    user_roles.push({
      id: randomUUID(),
      user_id: users[i].id,
      role_id: roles[i % 5].id,
      status: true,
      createdAt: new Date(),
    });
  }

  await prisma.$transaction([
    prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    }),
    prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    }),
    prisma.permission.createMany({
      data: permissions,
      skipDuplicates: true,
    }),
    prisma.role_Permission.createMany({
      data: role_permissions,
      skipDuplicates: true,
    }),
    prisma.user_Role.createMany({
      data: user_roles,
      skipDuplicates: true,
    }),
  ]);

  await prisma.$disconnect();
}

seed();
