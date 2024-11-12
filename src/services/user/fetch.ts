import { User } from "@prisma/client";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

interface FetchUserServiceResponse {
    users: User[] | null
}

export class FetchUserService{
    private userRepository: UsersRepositoryInterface

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(): Promise<FetchUserServiceResponse> {
        const users = await this.userRepository.fetch()

        return {users}
    }
}