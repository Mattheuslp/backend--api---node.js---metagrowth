import { Prisma } from "@prisma/client";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

export interface DeleteUserServiceRequest {
    userId: string;
    requestUserId: string
}

export class DeleteUserService {
    private userRepository: UsersRepositoryInterface;

    constructor(userRepository: UsersRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute({ userId, requestUserId }: DeleteUserServiceRequest) {

        if(requestUserId === userId) {
            const error = new Error("Não é possivel excluir o próprio usuário.");
            (error as any).statusCode = 403; 
            throw error
        }    

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
