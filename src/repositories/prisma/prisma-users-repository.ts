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
            },
        })
    }

    async findById(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                team: {
                    select: {
                        name: true,
                    },
                },
            },
        })
    }

    async update(userId: string, updateData: Prisma.UserUpdateInput) {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: updateData,
        });
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

    async fetch() {
        return await prisma.user.findMany({
            orderBy: {
                name: 'asc'
            }
        })
    }

    async findUsersWithoutTeams() {
        return await prisma.user.findMany({
            where: {
                teamId: null,
            },
            select: {
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
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    

    async findUsersNotManagingTeams() {
        return await prisma.user.findMany({
            where: {
                managedTeam: null, 
            },
            select: {
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
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
}