

import { Team} from '@prisma/client';
import { TeamsRepositoryInterface } from '../../repositories/team-repository-interface';



export interface CreateServiceRequest {
    name: string;
    managerId: string;
}

interface CreateServiceResponse {
    team: Team | null
}

export class CreateService {
    private teamRepository: TeamsRepositoryInterface

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository
    }

    async execute({ managerId, name }: CreateServiceRequest): Promise<CreateServiceResponse> {  
        
        const manager = await this.teamRepository.findByManagerId(managerId)

        if (managerId) {
            throw new Error('Usuário já é getor de outra equipe')
        }

        const team = await this.teamRepository.create({
            name,
            manager: { connect: { id: managerId } }
        });

        return {
            team
        }
    }
}