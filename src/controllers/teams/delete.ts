import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { DeleteFactory } from '../../services/factories/team/delete-factory';


export async function deleteTeam(request: FastifyRequest, reply: FastifyReply) {
 
    const deleteParamsSchema = z.object({
        teamId: z.string(),
    });

    try {
        const { teamId } = deleteParamsSchema.parse(request.params);

        console.log('a', teamId)
        const deleteService = DeleteFactory();
        await deleteService.execute({ teamId });

        return reply.status(200).send({ message: 'Time excluído com sucesso' });
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
