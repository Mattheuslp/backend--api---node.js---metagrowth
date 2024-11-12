
import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository";
import { FetchTeamByIdService } from "../../team/fetchById";



export function fetchTeamByIdFactory() {
    const teamRepository = new PrismaTeamRepository()
    const team = new  FetchTeamByIdService(teamRepository)

    return team
}