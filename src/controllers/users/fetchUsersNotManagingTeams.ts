
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchUserWithoutTeamsFactory } from "../../services/factories/user/fetch-users-without-teams-factory";
import { fetchUsersNotManagingTeamsFactory } from "../../services/factories/user/fetch-users-not-managing-teams-factory";

export async function fetchUsersNotManagingTeam(request: FastifyRequest, reply: FastifyReply) {
    
        await request.jwtVerify()

        const fetchUser = fetchUsersNotManagingTeamsFactory()

        const {users} = await fetchUser.execute()
    
        return reply.status(200).send(users
        )

}