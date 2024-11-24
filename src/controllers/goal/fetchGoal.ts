import { FastifyReply, FastifyRequest } from "fastify";
import { FetchFactory } from "../../services/factories/goal/fetch-factory";

export async function fetchGoal(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();

        const { id } = request.params as { id?: string };
        const userId = request.user.sub;

        const fetchGoalService = FetchFactory();

        if (id) {
          
            const goal = await fetchGoalService.fetchById(id);

            if (!goal) {
                return reply.status(404).send({ message: "Meta não encontrada" });
            }

            return reply.status(200).send(goal);
        }

        const goals = await fetchGoalService.execute({ userId });
        return reply.status(200).send(goals);
    } catch (error: any) {
        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
