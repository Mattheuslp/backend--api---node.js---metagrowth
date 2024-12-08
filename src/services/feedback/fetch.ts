import { FeedbackRepositoryInterface } from "../../repositories/feedback-repository-interface";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

export interface FetchFeedbackRequest {
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

  async fetchByFeedbackId(feedbackId: string) {
    const feedback = await this.feedbackRepository.fetchById(feedbackId);

    if (!feedback) {
      throw new Error("Feedback não encontrado");
    }

    return feedback;
  }

  async fetchFeedbacksByManager({ userId }: FetchFeedbackRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user || !user.managinTeam) {
      throw new Error("Usuário não encontrado ou não gerencia uma equipe");
    }

    return await this.feedbackRepository.fetchFeedbacksByTeamManager(userId);
  }

  async fetchFeedbacksByUser({ userId }: FetchFeedbackRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return await this.feedbackRepository.fetchFeedbacksByUserId(userId);
  }
}
