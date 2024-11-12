
import { FastifyReply, FastifyRequest } from "fastify";
import { fetchTeamByIdFactory } from "../../services/factories/team/fetch-by-id-factory";
import { z } from "zod";

export async function fetchTeamById(request: FastifyRequest, reply: FastifyReply) {
    const fetchTeamByIdBodySchema = z.object({
        teamId: z.string().min(1),
    });

        await request.jwtVerify()

        const {teamId} =fetchTeamByIdBodySchema.parse(request.query)
        console.log('team', teamId)
        const fetchTeams = fetchTeamByIdFactory()
    
        const {team} = await fetchTeams.execute({id: teamId})
    
        return reply.status(200).send(team
        )

}