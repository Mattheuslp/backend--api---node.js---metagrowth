
import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { FetchUserService } from "../../user/fetch";


export function fetchUserFactory() {
    const userRepository = new PrismaUserRepository()
    const goalRepository = new PrismaGoalRepository()
    const user = new  FetchUserService(userRepository, goalRepository)

    return user
}