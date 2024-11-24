import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TeamsRepositoryInterface } from "../team-repository-interface";




export class PrismaTeamRepository implements TeamsRepositoryInterface {

    async create(data: Prisma.TeamCreateInput) {
        return await prisma.team.create({
            data,
        });
    }

    async findByManagerId(userId: string) {
        return await prisma.team.findUnique({
            where: {
                managerId: userId
            }
        })
    }

    async findByName(name: string) {
        return await prisma.team.findFirst({
            where: {
                name
            }
        })
    }

    async fetch() {
        return await prisma.team.findMany()
    }

    async findById(id: string) {
        return await prisma.team.findUnique({
            where: {
                id,
            },
            include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                manager: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    }

    async update(id: string, data: Prisma.TeamUpdateInput) {
    
        return await prisma.team.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        await prisma.team.delete({
            where: {
                id
            }
        })
    }
}