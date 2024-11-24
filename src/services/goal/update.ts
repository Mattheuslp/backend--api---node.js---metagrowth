import { GoalRepositoryInterface } from '../../repositories/goal-repository-interface';

export interface UpdateGoalRequest {
    id: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    isCompleted?: boolean;
    userId?: string; // Adicionado userId como opcional
}

export class UpdateGoalService {
    private goalRepository: GoalRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface) {
        this.goalRepository = goalRepository;
    }

    async execute({ id, title, startDate, endDate, description, isCompleted, userId }: UpdateGoalRequest) {

        if (startDate && endDate && startDate >= endDate) {
            throw { statusCode: 400, message: 'A data de início deve ser anterior à data de fim.' };
        }

        const dataToUpdate: { [key: string]: any } = {};
        if (title !== undefined) dataToUpdate.title = title;
        if (startDate !== undefined) dataToUpdate.startDate = startDate;
        if (endDate !== undefined) dataToUpdate.endDate = endDate;
        if (description !== undefined) dataToUpdate.description = description;
        if (isCompleted !== undefined) dataToUpdate.isCompleted = isCompleted;
        if (userId !== undefined) dataToUpdate.userId = userId; 

        await this.goalRepository.update({ id, data: dataToUpdate });
    }
}
