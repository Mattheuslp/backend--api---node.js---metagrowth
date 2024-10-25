import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterFactory } from "../../services/factories/user/register-factory";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['MANAGER', 'MEMBER'])
        .optional(),
        teamID: z.string().optional(),
        admission_date: z.string().optional().transform((date) => date ? new Date(date) : undefined),
        phone: z.string().optional(),
        enrollment: z.string().optional(),
        education: z.string().optional(),
        bio: z.string().optional(),
        certifications: z.string().optional()
    })

    const {
        name,
        email,
        password,
        admission_date,
        bio,
        certifications,
        education,
        enrollment,
        phone,
        role,
        teamID
    } = registerBodySchema.parse(request.body)

    try {
        const registerService = RegisterFactory()

        await registerService.execute({
            name,
            email,
            password,
            admission_date,
            bio,
            certifications,
            education,
            enrollment,
            phone,
            role,
            teamID
        })
    } catch (error) {
        throw error
    }

    return reply.status(201).send()
}
