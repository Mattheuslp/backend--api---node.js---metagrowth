import { FastifyReply, FastifyRequest } from "fastify";
import {  z } from "zod";
import { authenticateFactory } from "../../services/factories/user/authenticate-factory";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authenticateBodySchema.parse(request.body)

    try {
        const authenticate = authenticateFactory()

        const {user} = await authenticate.execute({
            email,
            password
        })
     
        const token = await reply.jwtSign({}, {
            sign: {
             sub: user.id
            }
        })
        
        const refreshToken = await reply.jwtSign({}, {
            sign: {
             sub: user.id,
             expiresIn: '7d'
            }
        })

    
        return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: false,
            sameSite: true,
            httpOnly: true,
        })
        .status(200)
        .send({
            token
        })


    } catch (error) {
        return reply.status(403).send({error: 'Invalid credentials'})
    }
    
}