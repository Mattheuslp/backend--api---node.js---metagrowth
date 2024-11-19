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
    

}
