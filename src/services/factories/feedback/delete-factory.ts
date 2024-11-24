import { DeleteFeedbackService } from "../../feedback/delete"
import { PrismaFeedbackRepository } from "../../../repositories/prisma/prisma-feedback-repository"

export function DeleteFactory() {
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const feedbackFactory = new DeleteFeedbackService(prismaFeedbackRepository)

    return feedbackFactory
}