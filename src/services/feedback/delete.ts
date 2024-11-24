import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";

interface DeleteFeedbackRequest {
  id: string; 
}

export class DeleteFeedbackService {
  private feedbackRepository: FeedbackRepositoryInterface;

  constructor(feedbackRepository: FeedbackRepositoryInterface) {
    this.feedbackRepository = feedbackRepository;
  }

  async execute({ id }: DeleteFeedbackRequest) {
    return await this.feedbackRepository.delete(id);
  }
}
