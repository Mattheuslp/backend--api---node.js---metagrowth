import { Team } from '@prisma/client';
import { TeamsRepositoryInterface } from '../../repositories/team-repository-interface';

export interface CreateServiceRequest {
    name: string;
    managerId: string;
    userIds?: string[];  
}

interface CreateServiceResponse {
    team: Team | null;
}

export class CreateService {
    private teamRepository: TeamsRepositoryInterface;

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository;
    }

    async execute({ managerId, name, userIds }: CreateServiceRequest): Promise<CreateServiceResponse> {  
        const manager = await this.teamRepository.findByManagerId(managerId);

        if (manager) {
            throw { statusCode: 409, message: 'Usuário já é gestor de outra equipe' };
        }

        const teamName = await this.teamRepository.findByName(name)

        if(teamName) {
            throw { statusCode: 409, message: 'Já existe um time com esse mesmo nome' };
        }

        const team = await this.teamRepository.create({
            name,
            manager: { connect: { id: managerId } },
            Users: userIds ? { connect: userIds.map((id) => ({ id })) } : undefined,
        });

        return {
            team
        };
    }
}
