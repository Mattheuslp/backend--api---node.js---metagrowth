
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterFactory } from "../../services/factories/user/register-factory";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} = registerBodySchema.parse(request.body)

    try {
        const registerService = RegisterFactory()

        await registerService.execute({
            name,
            email,
            password
        })
    } catch (error) {
        
        throw error
    }

    return reply.status(201).send()
}