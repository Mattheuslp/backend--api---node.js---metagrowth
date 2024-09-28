
import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate"
import { register } from "./register"
import { getUser } from "./getUser"
import { refresh } from "./refresh"
import { logout } from "./logout"

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.get('/getUser', getUser)
    app.patch('/token/refresh', refresh)
    app.delete('/logout', logout)
}