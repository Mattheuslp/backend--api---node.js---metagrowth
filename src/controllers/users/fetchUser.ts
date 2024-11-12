
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchUserFactory } from "../../services/factories/user/fetch-factory";

export async function fetchUsers(request: FastifyRequest, reply: FastifyReply) {
    
        await request.jwtVerify()

        const fetchUser = fetchUserFactory()
    
        const {users} = await fetchUser.execute()
    
        return reply.status(200).send(users
        )

}