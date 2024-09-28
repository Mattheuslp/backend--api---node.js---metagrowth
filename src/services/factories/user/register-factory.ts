import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository"
import { RegisterService } from "../../user/user"


export function RegisterFactory() {
    const prismaUserRepository = new PrismaUserRepository()
    const registerService = new RegisterService(prismaUserRepository)

    return registerService
}