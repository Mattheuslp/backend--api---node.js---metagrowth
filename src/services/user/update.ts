import { Prisma } from "@prisma/client"
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface"

export interface UpdateUserServiceRequest {
    userId: string
    updateData: Partial<Prisma.UserUpdateInput>
}


export class UpdateUserService {
    private userRepository: UsersRepositoryInterface

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute({ userId, updateData }: UpdateUserServiceRequest) {

        try {
            await this.userRepository.update(userId, updateData)
        } catch (error) {
            throw error
        }

    }
}