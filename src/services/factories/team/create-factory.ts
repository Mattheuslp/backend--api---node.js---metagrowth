import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository"
import { CreateService } from "../../team/create"

export function RegisterFactory() {
    const prismaUserRepository = new PrismaTeamRepository()
    const teamService = new CreateService(prismaUserRepository)

    return teamService
}