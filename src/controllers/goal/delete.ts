import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { DeleteFactory } from '../../services/factories/goal/delete-factory';


export async function deleteGoal(request: FastifyRequest, reply: FastifyReply) {
    const deleteGoalParamsSchema = z.object({
        id: z.string().uuid(),
    });

    try {
        const { id } = deleteGoalParamsSchema.parse(request.params);

        const deleteGoalService = DeleteFactory();
        await deleteGoalService.execute(id);

        return reply.status(200).send({ message: 'Meta deletada com sucesso' });
    } catch (error: any) {
        
        return reply.status(500).send({ message: 'Erro interno do servidor' });
    }
}
