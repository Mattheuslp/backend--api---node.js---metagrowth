
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { fetchTeams } from "./fetchTeam"
import { updateTeam } from "./updateTeam"
import { deleteTeam } from "./delete"


export async function teamRoutes(app: FastifyInstance) {
    app.post('/teams', register)
    app.get('/teams', fetchTeams)
    app.patch('/teams/:teamId', updateTeam)
    app.delete('/teams/:teamId', deleteTeam)
}