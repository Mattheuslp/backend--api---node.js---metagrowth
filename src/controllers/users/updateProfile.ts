import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { updateUserFactory } from "../../services/factories/user/update-user-factory";

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
    
    const updateUserContentSchema = z.object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        role: z.preprocess(
            (val) => (typeof val === 'string' ? val.toUpperCase() : val),
            z.enum(['MANAGER', 'MEMBER']).optional()
        ).optional(),
        admission_date: z.string().datetime().optional(),
        phone: z.string().optional(),
        enrollment: z.string().optional(),
        education: z.string().optional(),
        bio: z.string().optional(),
        certifications: z.string().optional(),
        teamId: z.string().optional(),
    });
    
    const updateUserSchema = z.object({
        userId: z.string().min(1),
        updateData: updateUserContentSchema
    });

    try {
        const { userId, updateData } = updateUserSchema.parse(request.body);

        const updateUser = updateUserFactory();
        await updateUser.execute({ userId, updateData });

        reply.status(200).send({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        if (error instanceof Error && error.message === "usuário não encontrado") {
            return reply.status(404).send({ error: error.message });
        }

        // Outros erros
        const errorMessage = (error as Error).message || 'Internal Server Error';
        return reply.status(500).send({ error: errorMessage });
    }
}
