
import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate"
import { register } from "./register"

import { refresh } from "./refresh"
import { logout } from "./logout"
import { updateProfile } from "./updateProfile"
import { deleteUser } from "./delete"
import { fetchUsers } from "./fetchusers"

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
    app.patch('/token/refresh', refresh)
    app.delete('/logout', logout)
    app.patch('/users/:userId', updateProfile)
    app.delete('/users', deleteUser)
    app.get('/fetchusers', fetchUsers)
}