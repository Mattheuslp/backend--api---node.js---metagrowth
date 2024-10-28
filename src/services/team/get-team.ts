import { Team } from "@prisma/client"
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface"


interface GetTeamServiceRequest {
    teamId: string
}

interface GetTeamServiceResponse {
    team: Team
}

export class GetTeamService{
    private teamRepository: TeamsRepositoryInterface

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository
    }

    async execute({teamId}: GetTeamServiceRequest): Promise<GetTeamServiceResponse>{
       // todo 

        if(!team) {
            throw new Error('Conteúdo não encontrado')
        }
        
        console.log('team', team)

        return {
            team
        }
    }

}