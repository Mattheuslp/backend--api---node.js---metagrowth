import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

interface CreateFeedbackRequest {
    userId: string;
    givenByUserId: string;
    technicalSkill: number;
    resilience: number;
    sociability: number;
    description: string;
}

export class CreateFeedbackService {
    private feedbackRepository: FeedbackRepositoryInterface;

    constructor(feedbackRepository: FeedbackRepositoryInterface) {
        this.feedbackRepository = feedbackRepository;
    }

    async execute({
        userId,
        givenByUserId,
        technicalSkill,
        resilience,
        sociability,
        description,
    }: CreateFeedbackRequest) {

        return await this.feedbackRepository.create({
            user: { connect: { id: userId } }, 
            givenByUser: { connect: { id: givenByUserId } },
            technicalSkill,
            resilience,
            sociability,
            description,
        });
    }
}
