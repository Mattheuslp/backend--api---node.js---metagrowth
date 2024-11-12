
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-users-repository";
import { FetchUsersNotManagingTeamsService } from "../../user/fetchUsersNotManagingTeamsService";
import { FetchUsersWithoutTeamsService } from "../../user/fetchUsersWithoutTeams";


export function fetchUsersNotManagingTeamsFactory() {
    const userRepository = new PrismaUserRepository()
    const user = new  FetchUsersNotManagingTeamsService(userRepository)

    return user
}