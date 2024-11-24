import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository";
import { PrismaTeamRepository } from "../../../repositories/prisma/prisma-team-repository";
import { FetchGoalMetricsService } from "../../goal/fetchGoalMetricsService";


export function FetchGoalMetricsFactory() {
    const goalRepository = new PrismaGoalRepository();
    const teamRepository = new PrismaTeamRepository();
    return new FetchGoalMetricsService(goalRepository, teamRepository);
}