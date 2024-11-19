import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository"
import { DeleteGoalService } from "../../goal/delete"


export function DeleteFactory() {
    const prismaGoalRepository = new PrismaGoalRepository()
    const goalService = new DeleteGoalService(prismaGoalRepository)

    return goalService
}