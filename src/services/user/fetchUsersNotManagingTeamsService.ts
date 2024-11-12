import { User } from "@prisma/client";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";


interface FetchUsersNotManagingTeamsServiceResponse {
    users: Omit<User, 'password_hash'>[];
}

export class FetchUsersNotManagingTeamsService {
    private userRepository: UsersRepositoryInterface;

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<FetchUsersNotManagingTeamsServiceResponse> {
        const users = await this.userRepository.findUsersNotManagingTeams();
        
        return { users };
    }
}
