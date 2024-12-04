import { FastifyReply, FastifyRequest } from "fastify";
import { FetchGoalReportFactory } from "../../services/factories/goal/fetch-goal-report-factory";


export async function fetchGoalReport(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();

        const userId = request.user.sub;
    
        const fetchGoalReportService = FetchGoalReportFactory();
        const report = await fetchGoalReportService.execute({ userId });

        return reply.status(200).send(report);
    } catch (error: any) {
        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
