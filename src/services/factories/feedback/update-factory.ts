
import { PrismaFeedbackRepository } from "../../../repositories/prisma/prisma-feedback-repository"
import { UpdateFeedbackService } from "../../feedback/update"



export function UpdateFactory() {
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const feedbackFacotory = new UpdateFeedbackService(prismaFeedbackRepository)

    return feedbackFacotory
}