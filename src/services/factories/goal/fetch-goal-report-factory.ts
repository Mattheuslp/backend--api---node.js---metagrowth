import { OpenAiMetricsRepository } from "../../../repositories/openAi/openAi-metrics-repository";
import { PrismaGoalRepository } from "../../../repositories/prisma/prisma-goal-repository";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { FetchGoalReportService } from "../../goal/fetchGoalReportService";



export function FetchGoalReportFactory() {
    const userRepository = new PrismaUserRepository();
    const goalRepository = new PrismaGoalRepository()
    const openAiRepository = new OpenAiMetricsRepository()
    return new FetchGoalReportService(userRepository,goalRepository, openAiRepository);
}