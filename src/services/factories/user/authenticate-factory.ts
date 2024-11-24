

import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../../user/authenticate";


export function authenticateFactory() {
    const prismaUsersRepository = new PrismaUserRepository()
 
    const authenticateService = new AuthenticateService(prismaUsersRepository )

    return authenticateService
}