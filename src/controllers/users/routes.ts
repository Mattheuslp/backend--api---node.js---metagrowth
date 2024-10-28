
import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate"
import { register } from "./register"
import { getUser } from "./getUser"
import { refresh } from "./refresh"
import { logout } from "./logout"
import { updateProfile } from "./updateProfile"
import { deleteUser } from "./delete"

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.get('/getUser', getUser)
    app.patch('/token/refresh', refresh)
    app.delete('/logout', logout)
    app.patch('/users', updateProfile)
    app.delete('/users', deleteUser)
}