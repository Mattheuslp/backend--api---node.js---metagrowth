import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { GoalRepositoryInterface } from "../goal-repository-interface";

export class PrismaGoalRepository implements GoalRepositoryInterface {
    async create(data: Prisma.GoalCreateInput) {
        await prisma.goal.create({
            data,
        });
    }

    async update({ id, data }: { id: string, data: Prisma.GoalUpdateInput }) {
        await prisma.goal.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: string) {
        await prisma.goal.delete({
            where: {
                id
            }
        })
    }
    
    async fetch() {
        return await prisma.goal.findMany()
    }
    async fetchByUserId(userId: string) {
        return await prisma.goal.findMany({
            where: {
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        role: true
                    },
                },
            },
        });
    }
    
    async fetchByTeamManager(managerId: string) {
        
        const team = await prisma.team.findUnique({
            where: { managerId },
            include: {
                Users: {
                    select: { id: true },
                },
            },
        });
    
        if (!team) {
            throw new Error("Time não encontrado ou você não é um gerente.");
        }
    
        return await prisma.goal.findMany({
            where: {
                userId: { in: team.Users.map(user => user.id) }, 
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        role: true,
                    },
                },
            },
        });
    }

    async fetchById(id: string) {
        return await prisma.goal.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        role: true,
                    },
                },
            },
        });
    }
    
    async countAchievedGoals(userId: string, isManager: boolean) {
        if (isManager) {
            const team = await prisma.team.findUnique({
                where: { managerId: userId },
                include: {
                    Users: {
                        select: { id: true },
                    },
                },
            });
    
            if (!team) {
                throw new Error("Time não encontrado ou você não é um gerente.");
            }
   
            return await prisma.goal.count({
                where: {
                    userId: { in: team.Users.map(user => user.id) },
                    isCompleted: true,
                },
            });
        }
    
       
        return await prisma.goal.count({
            where: {
                userId,
                isCompleted: true,
            },
        });
    }
    
    async countTotalGoals(userId: string, isManager: boolean) {
        if (isManager) {
            const team = await prisma.team.findUnique({
                where: { managerId: userId },
                include: {
                    Users: {
                        select: { id: true },
                    },
                },
            });
    
            if (!team) {
                throw new Error("Time não encontrado ou você não é um gerente.");
            }
    
            return await prisma.goal.count({
                where: {
                    userId: { in: team.Users.map(user => user.id) },
                },
            });
        }
    
       
        return await prisma.goal.count({
            where: {
                userId,
            },
        });
    }
    
    async countPendingGoals(userId: string, isManager: boolean) {
        if (isManager) {
            const team = await prisma.team.findUnique({
                where: { managerId: userId },
                include: {
                    Users: {
                        select: { id: true },
                    },
                },
            });
    
            if (!team) {
                throw new Error("Time não encontrado ou você não é um gerente.");
            }
    
            return await prisma.goal.count({
                where: {
                    userId: { in: team.Users.map(user => user.id) },
                    isCompleted: false,
                },
            });
        }
    
       
        return await prisma.goal.count({
            where: {
                userId,
                isCompleted: false,
            },
        });
    }
    
}
