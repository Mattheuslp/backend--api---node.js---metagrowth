import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

export interface FetchGoalMetricsRequest {
    userId: string;
    metric?: string;
}

export class FetchGoalMetricsService {
    private goalRepository: GoalRepositoryInterface;
    private teamRepository: TeamsRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface, teamRepository: TeamsRepositoryInterface) {
        this.goalRepository = goalRepository;
        this.teamRepository = teamRepository;
    }

    async execute({ userId, metric }: FetchGoalMetricsRequest) {
        const teamManaged = await this.teamRepository.findByManagerId(userId);
        const isManager = !!teamManaged;

        if (metric === "achieved") {
            const achievedGoals = await this.goalRepository.countAchievedGoals(userId, isManager);
            return { achievedGoals };
        }

        if (metric === "total") {
            const totalGoals = await this.goalRepository.countTotalGoals(userId, isManager);
            return { totalGoals };
        }

        if (metric === "pending") {
            const pendingGoals = await this.goalRepository.countPendingGoals(userId, isManager);
            return { pendingGoals };
        }

        if (metric === "percentage") {
            const achievedGoals = await this.goalRepository.countAchievedGoals(userId, isManager);
            const totalGoals = await this.goalRepository.countTotalGoals(userId, isManager);
            const percentage = totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0;
            return { percentage: Math.round(percentage) }; 
        }

        const achievedGoals = await this.goalRepository.countAchievedGoals(userId, isManager);
        const totalGoals = await this.goalRepository.countTotalGoals(userId, isManager);
        const pendingGoals = await this.goalRepository.countPendingGoals(userId, isManager);
        const percentage = totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0;

        return {
            achievedGoals,
            totalGoals,
            pendingGoals,
            percentage: Math.round(percentage), 
        };
    }
}
