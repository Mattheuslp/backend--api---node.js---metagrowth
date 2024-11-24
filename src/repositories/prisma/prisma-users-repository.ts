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
  async create(data: Prisma.UserCreateInput){
    return await prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string){
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: userSelectFields,
    });
  }

  async update(userId: string, updateData: Prisma.UserUpdateInput) {
    console.log('user', updateData)
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async delete(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });
  }

  async hasTeam(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: true,
        managedTeam: true,
      },
    });
  }

  async fetch(){
    return await prisma.user.findMany({
      select: userSelectFields,
      orderBy: { name: 'asc' },
    });
  }

  async findUsersWithoutTeams() {
    return await prisma.user.findMany({
        where: {
            AND: [
                { teamId: null },
                { role: { not: 'MANAGER' } } 
            ],
        },
        select: userSelectFields,
        orderBy: { name: 'asc' },
    });
}

  async findUsersNotManagingTeams() {
    return await prisma.user.findMany({
      where: {
        managedTeam: null,
        role: 'MANAGER',
      },
      select: userSelectFields,
      orderBy: { name: 'asc' }, 
    });
  }

  async findTeamMembersByManager(managerId: string) {
    const team = await prisma.team.findUnique({
      where: {
        managerId,
      },
      select: {
        Users: {
          select: userSelectFields,
        },
      },
    });
  
    if (!team) {
      throw new Error("Gerente não gerencia nenhum time");
    }
  
    return team.Users;
  }


}
