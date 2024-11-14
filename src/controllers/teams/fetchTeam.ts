import { FastifyReply, FastifyRequest } from "fastify";
import { fetchTeamFactory } from "../../services/factories/team/fetch-factory";
import { z } from "zod";

export async function fetchTeams(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify();

    const fetchTeamsQuerySchema = z.object({
        teamId: z.string().optional(),
    });

    const { teamId } = fetchTeamsQuerySchema.parse(request.query);

    const fetchTeamsService = fetchTeamFactory();
    const { team } = await fetchTeamsService.execute({ id: teamId });

    return reply.status(200).send(team);
}