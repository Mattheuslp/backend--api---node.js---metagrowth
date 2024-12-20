import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository"
import { CreateService } from "../../team/create"

export function RegisterFactory() {
    const prismaTeamRepository = new PrismaTeamRepository()
    const teamService = new CreateService(prismaTeamRepository)

    return teamService
}