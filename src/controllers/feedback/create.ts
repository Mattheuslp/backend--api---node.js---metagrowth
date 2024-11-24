import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateFactory } from "../../services/factories/feedback/create-factory";

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
    const createFeedbackBodySchema = z.object({
        userId: z.string().uuid(), 
        technicalSkill: z.number().min(0).max(5),
        resilience: z.number().min(0).max(5),
        sociability: z.number().min(0).max(5),
        description: z.string().min(1),
    });

    try {
        await request.jwtVerify();
        const givenByUserId = request.user.sub; 

        const { userId, technicalSkill, resilience, sociability, description } = createFeedbackBodySchema.parse(request.body);

        const createFeedbackService = CreateFactory();
        await createFeedbackService.execute({
            userId,
            givenByUserId,
            technicalSkill,
            resilience,
            sociability,
            description,
        });

        return reply.status(201).send({ message: "Feedback criado com sucesso" });
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                message: "Validation error",
                issues: error.errors,
            });
        }

        if (error.statusCode && error.message) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }
}