
import fastify from "fastify";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { env } from "../env";
import { userRoutes } from "../controllers/users/routes";


export const app = fastify()
app.register(require('@fastify/multipart'))

app.register(fastifyCookie)

app.register(fastifyCors, {
    origin: "http://localhost:5173", 
    credentials: true, 
});
   
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(userRoutes)

// app.addHook('onRequest', (request, reply, done) => {
//     const allowedOrigin = 'http://localhost:5173';
//     const referer = request.headers['referer'] || '';

//     if (!referer.startsWith(allowedOrigin)) {
//         return reply.status(403).send({ error: 'Forbidden' });
//     }

//     done();
// });


app.setErrorHandler((error, _, reply) => {

    if (error.name === 'FastifyError') {
        return reply
          .status(401)
          .send({ message: 'Invalid JWT token.', code: error.code })
      }

    if(error instanceof ZodError) {
        return reply 
            .status(400)
            .send({message: 'Validation error.', issue: error.format()})
    }   

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    } 
 
    return reply.status(500).send({message: 'Internal server error'})
})