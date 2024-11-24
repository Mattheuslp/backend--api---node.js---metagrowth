import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

interface UpdateFeedbackRequest {
  id: string; 
  data: {
    technicalSkill?: number;
    resilience?: number;
    sociability?: number;
    description?: string;
  };
}

export class UpdateFeedbackService {
  private feedbackRepository: FeedbackRepositoryInterface;

  constructor(feedbackRepository: FeedbackRepositoryInterface) {
    this.feedbackRepository = feedbackRepository;
  }

  async execute({ id, data }: UpdateFeedbackRequest) {
    return await this.feedbackRepository.update(id, data);
  }
}
