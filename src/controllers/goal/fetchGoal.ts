import { FastifyReply, FastifyRequest } from "fastify";
import { FetchFactory } from "../../services/factories/goal/fetch-factory";
import { z } from "zod";

export async function fetchGoal(request: FastifyRequest, reply: FastifyReply) {
    const fetchGoalsQueryParamsSchema = z.object({
        goalType: z.preprocess(
          (val) => (typeof val === "string" ? val.toUpperCase() : val), 
          z.enum(["MANAGER", "MEMBER"]).optional()
        ),
      });

    const fetchGoalParamsSchema = z.object({
        id: z.string().optional()
    })
    try {
        await request.jwtVerify();

        const { id } = fetchGoalParamsSchema.parse(request.params)
        const { goalType } = fetchGoalsQueryParamsSchema.parse(request.query)
        const userId = request.user.sub;

        const fetchGoalService = FetchFactory();

        if (id) {

            const goal = await fetchGoalService.fetchById(id);

            if (!goal) {
                return reply.status(404).send({ message: "Meta não encontrada" });
            }

            return reply.status(200).send(goal);
        }
        

        if(goalType === "MANAGER") {
            const goal = await fetchGoalService.fetchByManagerId({userId})

            return reply.status(200).send(goal)
        }

        if(goalType === "MEMBER") {
            const goal = await fetchGoalService.fetchByMemberId({userId})
            
            return reply.status(200).send(goal)
        }
        
        return reply.status(200).send({message: "é preciso denviar o queryParam ou params para obter uma meta"});
    } catch (error: any) {
        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}
