import { PrismaFeedbackRepository } from "../../../repositories/prisma/prisma-feedback-repository"
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository"
import { FetchFeedbackService } from "../../feedback/fetch"


export function FetchFactory() {
    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const prismaUserRepository = new PrismaUserRepository()
    const feedbackFactory = new FetchFeedbackService(prismaFeedbackRepository, prismaUserRepository)

    return feedbackFactory
}