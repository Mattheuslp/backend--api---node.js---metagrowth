import { Goal, Prisma} from "@prisma/client";

export interface GoalRepositoryInterface {
    create(data: Prisma.GoalCreateInput): Promise<void> 
    update({id, data}: {id: string, data: Prisma.GoalUpdateInput}): Promise<void>
    delete(id: string): Promise<void>
    fetch(): Promise<Goal[] | null>
    fetchByUserId(userId: string): Promise<Goal[]>;
    fetchByTeamManager(managerId: string): Promise<Goal[]>;
    fetchById(goalId: string): Promise<Goal & { user: { id: string; name: string; imageUrl: string; role: string } } | null>;
    countAchievedGoals(userId: string, isManager: boolean): Promise<number>;
    countTotalGoals(userId: string, isManager: boolean): Promise<number>;
    countPendingGoals(userId: string, isManager: boolean): Promise<number>;
}