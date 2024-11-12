
import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository";
import { UpdateService } from "../../team/update";


export function UpdateTeamFactory() {
    const teamRepository = new PrismaTeamRepository()
    const team = new  UpdateService(teamRepository)

    return team
}