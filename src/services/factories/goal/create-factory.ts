import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository"
import { CreateGoalService } from "../../goal/create"


export function RegisterFactory() {
    const prismaGoalRepository = new PrismaGoalRepository()
    const goalService = new CreateGoalService(prismaGoalRepository)

    return goalService
}