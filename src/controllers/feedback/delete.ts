import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { DeleteFactory } from "../../services/factories/feedback/delete-factory";

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
    const deleteFeedbackParamsSchema = z.object({
        feedbackId: z.string().uuid(),
    });

    try {
        const { feedbackId } = deleteFeedbackParamsSchema.parse(request.params);

        const deleteFeedbackService = DeleteFactory();
        await deleteFeedbackService.execute({ id: feedbackId });

        return reply.status(200).send({ message: "Feedback deletado com sucesso" });
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