import { GoalRepositoryInterface } from '../../repositories/goal-repository-interface';

export interface CreateGoalRequest {
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    userId: string;
    isCompleted?: boolean;
}

export class CreateGoalService {
    private goalRepository: GoalRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface) {
        this.goalRepository = goalRepository;
    }

    async execute({ title, startDate, endDate, description, userId, isCompleted = false }: CreateGoalRequest) {
 
        if (startDate >= endDate) {
            throw { statusCode: 400, message: 'A data de início deve ser anterior à data de fim.' };
        }

        await this.goalRepository.create({
            title,
            startDate,
            endDate,
            description,
            isCompleted,
            user: { connect: { id: userId } },
        });
    }
}
