import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { UserWithoutPasswordHash } from "../../repositories/prisma/prisma-users-repository";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

interface FetchUserServiceRequest {
  userId?: string;
  noTeam?: boolean;
  notManagingTeam?: boolean;
  currentUserId?: string;
  managerId?: string; 
}

interface UserMetrics {
  achievedGoals: number;
  totalGoals: number;
  pendingGoals: number;
}

interface FetchUserServiceResponse {
  users: UserWithoutPasswordHash[] | UserWithoutPasswordHash | null;
}

export class FetchUserService {
  private userRepository: UsersRepositoryInterface;
  private goalRepository: GoalRepositoryInterface;

  constructor(
    userRepository: UsersRepositoryInterface,
    goalRepository: GoalRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.goalRepository = goalRepository;
  }

  async execute({
    userId,
    noTeam,
    notManagingTeam,
    currentUserId,
    managerId,
  }: FetchUserServiceRequest): Promise<FetchUserServiceResponse> {

    if (currentUserId) {
      const user = await this.userRepository.findById(currentUserId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return { users: user };
    }

    if (userId) {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return { users: user };
    }

    if (noTeam) {
      const users = await this.userRepository.findUsersWithoutTeams();
      return { users };
    }

    if (notManagingTeam) {
      const users = await this.userRepository.findUsersNotManagingTeams();
      return { users };
    }

    if (managerId) {
      try {
        const users = await this.userRepository.findTeamMembersByManager(managerId);
        return { users };
      } catch (error) {
        throw new Error("Este gerente não gerencia nenhum time."); 
      }
    }

    let users = await this.userRepository.fetch();
    users = await Promise.all(
      users.map(async (user) => {
        const metrics = await this.fetchMetrics(user.id);
        const completedPercentage = metrics.totalGoals > 0
          ? (metrics.achievedGoals / metrics.totalGoals) * 100
          : 0;
    
        return {
          ...user,
          ...metrics,
          completedPercentage: parseFloat(completedPercentage.toFixed(2)), 
        };
      })
    );
    return { users };
  }

  async fetchMetrics (id: string): Promise<UserMetrics>  {
    const achievedGoals = await this.goalRepository.countAchievedGoals(id, false);
    const totalGoals = await this.goalRepository.countTotalGoals(id, false);
    const pendingGoals = await this.goalRepository.countPendingGoals(id, false);

    return { achievedGoals, totalGoals, pendingGoals };
  };
}
