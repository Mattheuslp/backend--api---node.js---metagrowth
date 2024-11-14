import { UserWithoutPasswordHash } from "../../repositories/prisma/prisma-users-repository";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";


interface FetchUserServiceRequest {
  userId?: string;
  noTeam?: boolean;
  notManagingTeam?: boolean;
  currentUserId?: string; 
}

interface FetchUserServiceResponse {
  users: UserWithoutPasswordHash[] | UserWithoutPasswordHash | null;
}

export class FetchUserService {
  private userRepository: UsersRepositoryInterface;

  constructor(userRepository: UsersRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute({
    userId,
    noTeam,
    notManagingTeam,
    currentUserId,
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


    const users = await this.userRepository.fetch();
    return { users };
  }
}
