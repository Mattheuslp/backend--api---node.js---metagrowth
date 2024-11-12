
import { Team } from "@prisma/client";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

interface FetchTeamByIdServiceRequest {
    id: string
}

interface FetchTeamByIdServiceResponse {
    team: Team | null
}

export class FetchTeamByIdService{
    private teamRepository: TeamsRepositoryInterface

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository
    }

    async execute({id}: FetchTeamByIdServiceRequest): Promise<FetchTeamByIdServiceResponse> {

        const team = await this.teamRepository.findById(id)

        return {team}
    }
}