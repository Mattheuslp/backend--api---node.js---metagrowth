import { User } from "@prisma/client";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

interface FetchUsersWithoutTeamsServiceResponse {
    users: Omit<User, 'password_hash'>[];
}

export class FetchUsersWithoutTeamsService {
    private userRepository: UsersRepositoryInterface;

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<FetchUsersWithoutTeamsServiceResponse> {
        const users = await this.userRepository.findUsersWithoutTeams();

        return { users };
    }
}
