import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

interface FetchFeedbackServiceRequest {
  feedbackId?: string
  userId: string; 
}

export class FetchFeedbackService {
  private feedbackRepository: FeedbackRepositoryInterface;
  private userRepository: UsersRepositoryInterface;

  constructor(
    feedbackRepository: FeedbackRepositoryInterface,
    userRepository: UsersRepositoryInterface
  ) {
    this.feedbackRepository = feedbackRepository;
    this.userRepository = userRepository;
  }

  async execute({ userId, feedbackId}: FetchFeedbackServiceRequest) {
    
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if(feedbackId) {
      return await this.feedbackRepository.fetchById(feedbackId)
    }


    if (user.role === "MANAGER") {
      
      return await this.feedbackRepository.fetchFeedbacksByTeamManager(userId);
    }

    
    return await this.feedbackRepository.fetchFeedbacksByUserId(userId);
  }
}
