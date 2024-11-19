import { GoalRepositoryInterface } from '../../repositories/goal-repository-interface';

export class DeleteGoalService {
    private goalRepository: GoalRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface) {
        this.goalRepository = goalRepository;
    }

    async execute(id: string): Promise<void> {
     
        if (!id) {
            throw { statusCode: 400, message: 'O ID da meta é obrigatório.' };
        }

  
        await this.goalRepository.delete(id);
    }
}
