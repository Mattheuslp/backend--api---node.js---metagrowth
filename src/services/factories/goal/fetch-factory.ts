import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository"
import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository"
import { CreateGoalService } from "../../goal/create"
import { FetchGoalService } from "../../goal/fetch"


export function FetchFactory() {
    const prismaGoalRepository = new PrismaGoalRepository()
    const prismaTeamRepository = new PrismaTeamRepository()
    const fetchService = new FetchGoalService(prismaGoalRepository, prismaTeamRepository)

    return fetchService
}