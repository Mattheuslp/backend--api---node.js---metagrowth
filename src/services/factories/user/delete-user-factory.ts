
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { DeleteUserService } from "../../user/delete";


export function deletetUserFactory() {
    const userRepository = new PrismaUserRepository()
    const deleteUser = new DeleteUserService(userRepository)

    return deleteUser
}