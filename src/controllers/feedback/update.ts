import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UpdateFactory } from "../../services/factories/feedback/update-factory";

export async function updateFeedback(request: FastifyRequest, reply: FastifyReply) {
    const updateFeedbackParamsSchema = z.object({
        feedbackId: z.string().uuid(),
    });

    const updateFeedbackBodySchema = z.object({
        technicalSkill: z.number().min(0).max(5).optional(),
        resilience: z.number().min(0).max(5).optional(),
        sociability: z.number().min(0).max(5).optional(),
        description: z.string().min(1).optional(),
    });

    try {
        const { feedbackId } = updateFeedbackParamsSchema.parse(request.params);
        const updateData = updateFeedbackBodySchema.parse(request.body);

        const updateFeedbackService = UpdateFactory();
        await updateFeedbackService.execute({ id: feedbackId, data: updateData });

        return reply.status(200).send({ message: "Feedback atualizado com sucesso" });
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