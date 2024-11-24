import { Feedback, Prisma } from "@prisma/client";

export interface FeedbackRepositoryInterface {
    create(data: Prisma.FeedbackCreateInput): Promise<Feedback>;
    fetchFeedbacksByTeamManager(managerId: string): Promise<Feedback[]>; 
    fetchFeedbacksByUserId(userId: string): Promise<Feedback[]>; 
    update(id: string, data: Prisma.FeedbackUpdateInput): Promise<Feedback>;
    delete(id: string): Promise<void>;
    fetchById(id: string): Promise<Feedback | null>
  }