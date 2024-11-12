
import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository";
import { FetchTeamService } from "../../team/fetch";


export function fetchTeamFactory() {
    const teamRepository = new PrismaTeamRepository()
    const team = new  FetchTeamService(teamRepository)

    return team
}