
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { fetchTeams } from "./fetchTeam"
import { fetchTeamById } from "./fetchTeamById"
import { updateTeam } from "./updateTeam"


export async function teamRoutes(app: FastifyInstance) {
    app.post('/teams', register)
    app.get('/teams', fetchTeams)
    app.patch('/teams/:teamId', updateTeam)
}