import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository"
import { DeleteService } from "../../team/delete"

export function DeleteFactory() {
    const prismaTeamRepository = new PrismaTeamRepository()
    const teamService = new DeleteService(prismaTeamRepository)

    return teamService
}