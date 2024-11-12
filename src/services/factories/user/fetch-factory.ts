
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { FetchUserService } from "../../user/fetch";


export function fetchUserFactory() {
    const userRepository = new PrismaUserRepository()
    const user = new  FetchUserService(userRepository)

    return user
}