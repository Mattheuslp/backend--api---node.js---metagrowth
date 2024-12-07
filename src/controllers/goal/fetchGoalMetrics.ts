import { FastifyReply, FastifyRequest } from "fastify";
import { FetchGoalMetricsFactory } from "../../services/factories/goal/fetch-goal-metrics-factory";
import { z } from "zod";

export async function fetchGoalMetrics(request: FastifyRequest, reply: FastifyReply) {

    const fetchGoalMetricsQueryParamsSchema = z.object({
        metric: z.string().optional(),
        metricsByTeam: z.preprocess(
            (value) => value === "true",
            z.boolean()
        ),
    })

    try {
        await request.jwtVerify();

        const userId = request.user.sub;
        const { metric, metricsByTeam } = fetchGoalMetricsQueryParamsSchema.parse(request.query)

        const fetchGoalMetricsService = FetchGoalMetricsFactory();
        const metrics = await fetchGoalMetricsService.execute({ userId, metric, metricsByTeam });

        return reply.status(200).send(metrics);
    } catch (error: any) {
        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
