import { Prisma, User, Team } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UsersRepositoryInterface } from "../users-repository-interface";


export const userSelectFields = {
    id: true,
    name: true,
    email: true,
    imageUrl: true,
    imageId: true,
    role: true,
    created_at: true,
    teamId: true,
    admission_date: true,
    phone: true,
    enrollment: true,
    education: true,
    bio: true,
    certifications: true,
    team: {
      select: {
        id: true,
        name: true,
      },
    },
    managedTeam: {
      select: {
        id: true,
        name: true,
      },
    },
  };
  
  export type UserWithoutPasswordHash = Prisma.UserGetPayload<{
    select: typeof userSelectFields;
  }>;

export class PrismaUserRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: string): Promise<UserWithoutPasswordHash | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: userSelectFields,
    });
  }

  async update(userId: string, updateData: Prisma.UserUpdateInput): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    });
  }

  async hasTeam(userId: string): Promise<User & { team: Team | null; managedTeam: Team | null } | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: true,
        managedTeam: true,
      },
    });
  }

  async fetch(): Promise<UserWithoutPasswordHash[]> {
    return await prisma.user.findMany({
      select: userSelectFields,
      orderBy: { name: 'asc' },
    });
  }

  async findUsersWithoutTeams(): Promise<UserWithoutPasswordHash[]> {
    return await prisma.user.findMany({
      where: { teamId: null },
      select: userSelectFields,
      orderBy: { name: 'asc' },
    });
  }

  async findUsersNotManagingTeams(): Promise<UserWithoutPasswordHash[]> {
    return await prisma.user.findMany({
      where: { managedTeam: null },
      select: userSelectFields,
      orderBy: { name: 'asc' },
    });
  }
}
