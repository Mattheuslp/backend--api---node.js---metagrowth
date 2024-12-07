import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { TeamsRepositoryInterface } from "../../repositories/team-repository-interface";

export interface FetchGoalMetricsRequest {
    userId: string;
    metric?: string;
    metricsByTeam: boolean
}

export class FetchGoalMetricsService {
    private goalRepository: GoalRepositoryInterface;
    private teamRepository: TeamsRepositoryInterface;

    constructor(goalRepository: GoalRepositoryInterface, teamRepository: TeamsRepositoryInterface) {
        this.goalRepository = goalRepository;
        this.teamRepository = teamRepository;
    }

    async execute({ userId, metric, metricsByTeam }: FetchGoalMetricsRequest) {
        // const teamManaged = await this.teamRepository.findByManagerId(userId);
        // const isManager = !!teamManaged;

        if (metric === "achieved") {
            
            const achievedGoals = await this.goalRepository.countAchievedGoals(userId, metricsByTeam);
            return { achievedGoals };
        }

        if (metric === "total") {
            const totalGoals = await this.goalRepository.countTotalGoals(userId, metricsByTeam);
            return { totalGoals };
        }

        if (metric === "pending") {
            const pendingGoals = await this.goalRepository.countPendingGoals(userId, metricsByTeam);
            return { pendingGoals };
        }

        if (metric === "percentage") {
            const achievedGoals = await this.goalRepository.countAchievedGoals(userId, metricsByTeam);
            const totalGoals = await this.goalRepository.countTotalGoals(userId, metricsByTeam);
            const percentage = totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0;
            return { percentage: Math.round(percentage) }; 
        }

        const achievedGoals = await this.goalRepository.countAchievedGoals(userId, metricsByTeam);
        const totalGoals = await this.goalRepository.countTotalGoals(userId, metricsByTeam);
        const pendingGoals = await this.goalRepository.countPendingGoals(userId, metricsByTeam);
        const percentage = totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0;

        return {
            achievedGoals,
            totalGoals,
            pendingGoals,
            percentage: Math.round(percentage), 
        };
    }
}
