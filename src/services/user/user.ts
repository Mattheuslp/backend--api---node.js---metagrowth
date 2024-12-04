
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
    imageUrl: string
    imageId: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    private usersRepository: UsersRepositoryInterface
  

    constructor(userRepository: UsersRepositoryInterface) {
        this.usersRepository = userRepository
       
    }

    async execute(data: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const { password, email, name, admission_date, bio, certifications, education, enrollment, phone, role, teamID, imageUrl, imageId } = data
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw { statusCode: 409, message: "Usuário com este e-mail já existe" };
        }

        const user = await this.usersRepository.create({ email, name, password_hash, admission_date, imageUrl, imageId, bio, certifications, education, enrollment, phone, role, ...(teamID && { team: { connect: { id: teamID } } }) })

   

        return {
            user,
        }
    }
    
}