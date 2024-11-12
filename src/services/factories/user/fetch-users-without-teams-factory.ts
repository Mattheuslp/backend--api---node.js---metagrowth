
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { FetchUsersWithoutTeamsService } from "../../user/fetchUsersWithoutTeams";


export function fetchUserWithoutTeamsFactory() {
    const userRepository = new PrismaUserRepository()
    const user = new  FetchUsersWithoutTeamsService(userRepository)

    return user
}