import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UpdateFactory } from '../../services/factories/goal/update-factory';


export async function updateGoal(request: FastifyRequest, reply: FastifyReply) {
    const updateGoalParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const updateGoalBodySchema = z.object({
        title: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        description: z.string().optional(),
        isCompleted: z.boolean().optional(),
    });

    try {

        const { id } = updateGoalParamsSchema.parse(request.params);
        const { title, startDate, endDate, description, isCompleted } = updateGoalBodySchema.parse(request.body);

        const updateGoalService = UpdateFactory();
        await updateGoalService.execute({ id, title, startDate, endDate, description, isCompleted });

        return reply.status(200).send({ message: 'Meta atualizada com sucesso' });
        
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                message: 'Validation error',
                issues: error.errors,
            });
        }

        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: 'Erro interno do servidor' });
    }
}
