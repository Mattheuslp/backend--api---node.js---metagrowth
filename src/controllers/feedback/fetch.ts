import { FastifyReply, FastifyRequest } from "fastify";
import { FetchFactory } from "../../services/factories/feedback/fetch-factory";
import { z } from "zod";

export async function fetchFeedback(request: FastifyRequest, reply: FastifyReply) {
  const fetchFeedbackParamsSchema = z.object({
    id: z.string().uuid().optional(),
  });

  const fetchFeedbackQueryParamsSchema = z.object({
    feedbackType: z.preprocess(
      (val) => (typeof val === "string" ? val.toUpperCase() : val),
      z.enum(["MANAGER", "MEMBER"]).optional()
    ),
  });

  try {
    await request.jwtVerify();

    const { id } = fetchFeedbackParamsSchema.parse(request.params);
    const { feedbackType } = fetchFeedbackQueryParamsSchema.parse(request.query);
    const userId = request.user.sub;

    const fetchFeedbackService = FetchFactory();

    if (id) {
      const feedback = await fetchFeedbackService.fetchByFeedbackId(id);

      if (!feedback) {
        return reply.status(404).send({ message: "Feedback não encontrado" });
      }

      return reply.status(200).send(feedback);
    }

    if (feedbackType === "MANAGER") {
      const feedbacks = await fetchFeedbackService.fetchFeedbacksByManager({ userId });
      return reply.status(200).send(feedbacks);
    }

    if (feedbackType === "MEMBER") {
      const feedbacks = await fetchFeedbackService.fetchFeedbacksByUser({ userId });
      return reply.status(200).send(feedbacks);
    }

    return reply.status(400).send({ message: "É preciso enviar o parâmetro de consulta ou ID do feedback" });
  } catch (error: any) {
    if (error.statusCode && error.message) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
}
