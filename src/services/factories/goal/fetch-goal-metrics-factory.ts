import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository";
import { FetchGoalMetricsService } from "../../goal/fetchGoalMetricsService";


export function FetchGoalMetricsFactory() {
    const goalRepository = new PrismaGoalRepository();
    return new FetchGoalMetricsService(goalRepository);
}