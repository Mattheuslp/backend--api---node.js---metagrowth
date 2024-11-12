
import { Team } from "@prisma/client";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

interface FetchTeamServiceResponse {
    team: Team[] | null
}

export class FetchTeamService{
    private teamRepository: TeamsRepositoryInterface

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository
    }

    async execute(): Promise<FetchTeamServiceResponse> {
        const team = await this.teamRepository.fetch()

        return {team}
    }
}