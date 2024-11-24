import { TeamsRepositoryInterface } from '../../repositories/team-repository-interface';

export interface DeleteServiceRequest {
    teamId: string;
}

export class DeleteService {
    private teamRepository: TeamsRepositoryInterface;

    constructor(teamRepository: TeamsRepositoryInterface) {
        this.teamRepository = teamRepository;
    }

    async execute({ teamId }: DeleteServiceRequest): Promise<void> {

        const team = await this.teamRepository.findById(teamId);

        if (!team) {
            throw { statusCode: 404, message: 'Time não encontrado' };
        }

        await this.teamRepository.delete(teamId);
    }
}
