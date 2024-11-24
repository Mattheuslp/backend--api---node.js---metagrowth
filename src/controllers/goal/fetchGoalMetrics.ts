import { FastifyReply, FastifyRequest } from "fastify";
import { FetchGoalMetricsFactory } from "../../services/factories/goal/fetch-goal-metrics-factory";

export async function fetchGoalMetrics(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();

        const userId = request.user.sub;
        const query = request.query as { metric?: string };

        const fetchGoalMetricsService = FetchGoalMetricsFactory();
        const metrics = await fetchGoalMetricsService.execute({ userId, metric: query.metric });

        return reply.status(200).send(metrics);
    } catch (error: any) {
        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
