
import { hash } from 'bcryptjs'
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";
import { User } from '@prisma/client';


export interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
    admission_date?: Date;
    bio?: string;
    certifications?: string;
    education?: string;
    enrollment?: string;
    phone?: string;
    role?: 'MANAGER' | 'MEMBER' 
    teamID?: string;
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    private UsersRepository: UsersRepositoryInterface

    constructor(userRepository: UsersRepositoryInterface) {
        this.UsersRepository = userRepository
    }

    async execute(data: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const { password, email, name, admission_date, bio, certifications, education, enrollment, phone, role, teamID } = data
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.UsersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('Usuário já existe')
        }

        const user = await this.UsersRepository.create({email,name,password_hash,admission_date,bio,certifications,education,enrollment,phone,role, ...(teamID && { team: { connect: { id: teamID } } })})

        return {
            user,
        }
    }
}