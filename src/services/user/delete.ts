import { Prisma } from "@prisma/client";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

export interface DeleteUserServiceRequest {
    userId: string;
}

export class DeleteUserService {
    private userRepository: UsersRepositoryInterface;

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute({ userId }: DeleteUserServiceRequest) {
        // Verifica se o usuário está vinculado a algum time
        const user = await this.userRepository.hasTeam(userId);

        if (user?.team || user?.managedTeam) {
            const error = new Error("O usuário está vinculado a um time e não pode ser excluído.");
            (error as any).statusCode = 409; 
            throw error;
        }


        const userExist = await this.userRepository.findById(userId);
        if (!userExist) {
            const error = new Error("O usuário não existe.");
            (error as any).statusCode = 404; 
            throw error;
        }

    
        await this.userRepository.delete(userId);
    }
}
