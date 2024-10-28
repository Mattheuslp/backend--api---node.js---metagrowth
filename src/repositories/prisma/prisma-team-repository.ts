import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TeamsRepositoryInterface } from "../team-repository-interface";




export class PrismaTeamRepository implements TeamsRepositoryInterface {

    async create(data: Prisma.TeamCreateInput) {
        return await prisma.team.create({
            data
        })
    }

    async findByManagerId(userId: string) {
        return await prisma.team.findUnique({
            where: {
                managerId: userId
            }
        })
    }
}