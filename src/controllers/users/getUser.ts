
import { FastifyReply, FastifyRequest } from "fastify";
import { getUserFactory } from "../../services/factories/user/get-user-factory";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    
        await request.jwtVerify()

        const getUserProfile = getUserFactory()
    
        const {user} = await getUserProfile.execute({
            userId: request.user.sub
        })
    
        return reply.status(200).send({
            user: {
                ...user,
                password_hash: undefined
            }
        })

}