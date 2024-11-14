import { Team } from "@prisma/client";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

interface FetchTeamServiceRequest {
    id?: string; 
}

interface FetchTeamServiceResponse {
    team: Team[] | Team | null;
}

export class FetchTeamService {
    private teamRepository: TeamsRepositoryInterface;

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository;
    }

    async execute({ id }: FetchTeamServiceRequest): Promise<FetchTeamServiceResponse> {
        if (id) {
    
            const team = await this.teamRepository.findById(id);
            return { team };
        } else {
    
            const team = await this.teamRepository.fetch();
            return { team };
        }
    }
}
