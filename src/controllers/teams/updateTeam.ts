import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UpdateTeamFactory } from '../../services/factories/team/update-factory';

export async function updateTeam(request: FastifyRequest, reply: FastifyReply) {
    const updateBodySchema = z.object({
        name: z.string().toUpperCase().optional(),
        managerId: z.string(),
        userIds: z.array(z.string()).optional()
    });

    const updateParamsSchema = z.object({
        teamId: z.string(),
    });

    try {
    
        const { managerId, name, userIds } = updateBodySchema.parse(request.body);
        const { teamId } = updateParamsSchema.parse(request.params);

        const updateTeamService = UpdateTeamFactory();
        await updateTeamService.execute({
            teamId,
            name,
            managerId,
            userIds: userIds ?? []  
        });
        

        return reply.status(200).send({ message: 'Time atualizado com sucesso' });
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

        return reply.status(500).send({ message: 'Internal server error' });
    }
}


