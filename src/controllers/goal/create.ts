import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterFactory } from '../../services/factories/goal/create-factory';

export async function createGoal(request: FastifyRequest, reply: FastifyReply) {
    const createGoalBodySchema = z.object({
        userId: z.string().uuid(),
        title: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        description: z.string(),
        isCompleted: z.boolean().optional(),
    });

    try {

        const { title, startDate, endDate, description, isCompleted, userId } = createGoalBodySchema.parse(request.body);


        const createGoalService = RegisterFactory();
        await createGoalService.execute({ title, startDate, endDate, description, userId, isCompleted });

        return reply.status(201).send({ message: 'Meta criada com sucesso' });
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
