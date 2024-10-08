
import { FastifyReply, FastifyRequest } from "fastify";
import { authenticateFactory } from "../../services/factories/user/authenticate-factory";


export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true })

        const authenticate = authenticateFactory()

        const storedToken = await authenticate.getToken(request.cookies.refreshToken || '')

        if (!storedToken || storedToken.revoked) {
            throw new Error()
        }

        const token = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: request.user.sub,
                expiresIn: '7d'
            }
        })

       await authenticate.saveRefreshToken({ refreshToken, userId: request.user.sub })

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
        return reply.status(403).send({ error: 'Invalid or expired refresh Token' })
    }


}