import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterFactory } from '../../services/factories/team/create-factory';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().toUpperCase(),
        managerId: z.string(),
        userIds: z.array(z.string()).optional() 
    });

    try {
        const { managerId, name, userIds } = registerBodySchema.parse(request.body);

        const registerService = RegisterFactory();
        await registerService.execute({ name, managerId, userIds });

        return reply.status(201).send({ message: 'Time criado com sucesso' });
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
    }
}
