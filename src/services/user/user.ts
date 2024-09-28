
import {hash} from 'bcryptjs'
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";
import { User } from '@prisma/client';


interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    private UsersRepository: UsersRepositoryInterface

    constructor(userRepository: UsersRepositoryInterface) {
        this.UsersRepository = userRepository
    }

    async execute({email , name , password}: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.UsersRepository.findByEmail(email)

        if(userWithSameEmail) {
            throw new Error('Usuário já existe')
        }

        const user = await this.UsersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user,
        }
    }
}