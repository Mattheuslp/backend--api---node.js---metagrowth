import { GoalRepositoryInterface } from '../../repositories/goal-repository-interface';

export interface UpdateGoalRequest {
    id: string; 
    title?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    isCompleted?: boolean;
}

export class UpdateGoalService {
    private goalRepository: GoalRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface) {
        this.goalRepository = goalRepository;
    }

    async execute({ id, title, startDate, endDate, description, isCompleted }: UpdateGoalRequest) {

        if (!id) {
            throw { statusCode: 400, message: 'O ID da meta é obrigatório.' };
        }

        if (startDate && endDate && startDate >= endDate) {
            throw { statusCode: 400, message: 'A data de início deve ser anterior à data de fim.' };
        }

        const dataToUpdate: { [key: string]: any } = {};
        if (title !== undefined) dataToUpdate.title = title;
        if (startDate !== undefined) dataToUpdate.startDate = startDate;
        if (endDate !== undefined) dataToUpdate.endDate = endDate;
        if (description !== undefined) dataToUpdate.description = description;
        if (isCompleted !== undefined) dataToUpdate.isCompleted = isCompleted;

        await this.goalRepository.update({ id, data: dataToUpdate });
    }
}
