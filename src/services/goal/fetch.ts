import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

export interface FetchGoalRequest {
    userId: string;
}

export class FetchGoalService {
    private goalRepository: GoalRepositoryInterface;
    private teamRepository: TeamsRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface, teamRepository: TeamsRepositoryInterface) {
        this.goalRepository = goalRepository;
        this.teamRepository = teamRepository;
    }

    async execute({ userId }: FetchGoalRequest) {

        const teamManaged = await this.teamRepository.findByManagerId(userId);

        if (teamManaged) {
            return await this.goalRepository.fetchByTeamManager(userId);
        }
        
        return await this.goalRepository.fetchByUserId(userId);
    }

    async fetchById(goalId: string) {
        return await this.goalRepository.fetchById(goalId);
    }
}
