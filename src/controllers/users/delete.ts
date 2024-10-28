import { FastifyRequest, FastifyReply } from "fastify";
import { deletetUserFactory } from "../../services/factories/user/delete-user-factory";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        userId: z.string().min(1),
    });

    const { userId } = authenticateBodySchema.parse(request.body);

    try {
        const deleteUser = deletetUserFactory();
        await deleteUser.execute({ userId });

        return reply.status(200).send({ message: "Usuário excluído com sucesso." });
    } catch (error) {
        if (error instanceof Error) {
          
            const statusCode = (error as any).statusCode || 500; 
            return reply.status(statusCode).send({ error: error.message });
        }

        return reply.status(500).send({ error: "Erro inesperado" });
    }
}
