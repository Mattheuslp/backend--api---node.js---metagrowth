
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchTeamFactory } from "../../services/factories/team/fetch-factory";

export async function fetchTeams(request: FastifyRequest, reply: FastifyReply) {
    
        await request.jwtVerify()

        const fetchTeams = fetchTeamFactory()
    
        const {team} = await fetchTeams.execute()
    
        return reply.status(200).send(team
        )

}