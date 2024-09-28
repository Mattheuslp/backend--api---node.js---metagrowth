import { Prisma} from "@prisma/client";
import { UsersRepositoryInterface } from "../users-repository-interface";
import { prisma } from "../../lib/prisma";


export class PrismaUserRepository implements UsersRepositoryInterface {
    
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data,
        })
    }

    async findByEmail(email: string) {
       return await prisma.user.findUnique({
            where: {
                email,
            }
        })
    }
    
    async findById(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
    }
    
    
    
}