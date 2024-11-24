import { CreateFeedbackService } from "../../feedback/create"
import { PrismaFeedbackRepository } from "../../../repositories/prisma/prisma-feedback-repository"

export function CreateFactory() {
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const feedbackFactory = new CreateFeedbackService(prismaFeedbackRepository)

    return feedbackFactory
}