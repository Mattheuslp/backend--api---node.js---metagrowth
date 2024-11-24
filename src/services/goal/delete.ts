import { GoalRepositoryInterface } from '../../repositories/goal-repository-interface';

export class DeleteGoalService {
    private goalRepository: GoalRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface) {
        this.goalRepository = goalRepository;
    }

    async execute(id: string): Promise<void> {
       
        await this.goalRepository.delete(id);
    }
}
