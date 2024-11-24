import { FastifyInstance } from "fastify";
import { createFeedback } from "./create";
import { updateFeedback } from "./update";
import { deleteFeedback } from "./delete";
import { fetchFeedback } from "./fetch";


export async function feedbackRoutes(app: FastifyInstance) {
    app.post('/feedbacks', createFeedback);
    app.patch('/feedbacks/:feedbackId', updateFeedback);
    app.delete('/feedbacks/:feedbackId', deleteFeedback);
    app.get('/feedbacks/:id?', fetchFeedback);
}
