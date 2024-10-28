import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository"
import { UpdateUserService } from "../../user/update"


export function updateUserFactory() {
    const userRepository = new PrismaUserRepository()
    const userUpdate= new UpdateUserService(userRepository)

    return userUpdate
}