import { Team } from '@prisma/client';
import { TeamsRepositoryInterface } from '../../repositories/team-repository-interface';

export interface UpdateServiceRequest {
    teamId: string;
    name?: string;
    managerId: string;
    userIds: string[];  
}

interface UpdateServiceResponse {
    team: Team | null;
}

export class UpdateService {
    private teamRepository: TeamsRepositoryInterface;

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository;
    }

    async execute({ teamId, managerId, name, userIds }: UpdateServiceRequest): Promise<UpdateServiceResponse> {  
    
        const manager = await this.teamRepository.findByManagerId(managerId);
        if (manager && manager.id !== teamId) {
            throw { statusCode: 409, message: 'Usuário já é gestor de outra equipe' };
        }
      
    
        if (name) {
            const teamName = await this.teamRepository.findByName(name);
            if (teamName && teamName.id !== teamId) {
                throw { statusCode: 409, message: 'Já existe um time com esse mesmo nome' };
            }
        }

     
        const team = await this.teamRepository.update(teamId, {
            name,
            manager: { connect: { id: managerId } },
            Users: {
                set: [], 
                connect: userIds.map((id) => ({ id })) 
            },
        });

        return {
            team
        };
    }
}
