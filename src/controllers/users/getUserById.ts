
import { FastifyReply, FastifyRequest } from "fastify";
import { getUserFactory } from "../../services/factories/user/get-user-factory";
import { z } from "zod";

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    const getUserByIdBodySchema = z.object({
        userId: z.string().min(1),
    });

    const { userId } = getUserByIdBodySchema.parse(request.query)

    await request.jwtVerify()

    const getUserProfile = getUserFactory()

    const { user } = await getUserProfile.execute({
        userId
    })

    return reply.status(200).send({
        ...user,
        password_hash: undefined,
        id: undefined,
        created_at: undefined,

    })

}