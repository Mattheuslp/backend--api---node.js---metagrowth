import { Prisma } from "@prisma/client";
import { UsersRepositoryInterface } from "../users-repository-interface";
import { prisma } from "../../lib/prisma";



export class PrismaUserRepository implements UsersRepositoryInterface {

    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data,
        })
    }

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            }
        })
    }

    async findById(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
    }

    async update(userId: string, updateData: Prisma.UserUpdateInput) {
        try {
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: updateData,
            });
        } catch (error) {
            throw new Error('usuário não encontrado')
        }

    }

    async delete(userId: string) {

        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }

    async hasTeam(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                team: true,
                managedTeam: true
            },
        });
    }
  

}