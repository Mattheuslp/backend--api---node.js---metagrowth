
import { FastifyInstance } from "fastify"
import { register } from "./register"
import { fetchTeams } from "./fetchTeam"
import { fetchTeamById } from "./fetchTeamById"
import { updateTeam } from "./updateTeam"


export async function teamRoutes(app: FastifyInstance) {
    app.post('/team', register)
    app.get('/team', fetchTeams)
    app.get('/teamById', fetchTeamById)
    app.patch('/teams', updateTeam)
}