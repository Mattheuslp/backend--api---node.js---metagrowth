import { FastifyReply, FastifyRequest } from "fastify";
import { FetchFactory } from "../../services/factories/feedback/fetch-factory";
import { z } from "zod";

export async function fetchFeedback(request: FastifyRequest, reply: FastifyReply) {
  const fetchFeedbackParamsSchema = z.object({
    id: z.string().uuid().optional(),
  });

  try {
    await request.jwtVerify(); 
    const loggedUserId = request.user.sub; 
    const { id } = fetchFeedbackParamsSchema.parse(request.params);

    const fetchFeedbackService = FetchFactory();
    const feedbacks = await fetchFeedbackService.execute({feedbackId: id, userId: loggedUserId });

    return reply.status(200).send(feedbacks);
  } catch (error: any) {
    if (error.statusCode && error.message) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
}
