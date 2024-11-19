import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository"
import { UpdateGoalService } from "../../goal/update"


export function UpdateFactory() {
    const prismaGoalRepository = new PrismaGoalRepository()
    const goalService = new UpdateGoalService(prismaGoalRepository)

    return goalService
}