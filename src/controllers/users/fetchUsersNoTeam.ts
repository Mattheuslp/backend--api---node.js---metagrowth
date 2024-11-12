
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchUserWithoutTeamsFactory } from "../../services/factories/user/fetch-users-without-teams-factory";

export async function fetchUsersNoTeam(request: FastifyRequest, reply: FastifyReply) {
    
        await request.jwtVerify()

        const fetchUser = fetchUserWithoutTeamsFactory()



        const {users} = await fetchUser.execute()
    
        return reply.status(200).send(users
        )

}