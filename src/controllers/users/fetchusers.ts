import { FastifyReply, FastifyRequest } from "fastify";
import { fetchUserFactory } from "../../services/factories/user/fetch-factory";
import { z } from "zod";

export async function fetchUsers(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const fetchUsersQuerySchema = z.object({
    userId: z.string().optional(),
    noTeam: z.coerce.boolean().optional(),
    notManagingTeam: z.coerce.boolean().optional(),
    currentUser: z.coerce.boolean().optional(),
    managerId: z.coerce.boolean().optional()
  });

  const { userId, noTeam, notManagingTeam, currentUser, managerId } = fetchUsersQuerySchema.parse(request.query);

  const fetchUserService = fetchUserFactory();

  try {
    const { users } = await fetchUserService.execute({
      userId,
      noTeam,
      notManagingTeam,
      currentUserId: currentUser ? request.user.sub : undefined,
      managerId: managerId ? request.user.sub : undefined,
    });

    return reply.status(200).send(users);
  } catch (error: any) {
   
    return reply.status(400).send({ message: error.message });
  }

}
