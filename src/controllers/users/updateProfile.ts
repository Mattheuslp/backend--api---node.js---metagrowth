import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { updateUserFactory } from "../../services/factories/user/update-user-factory";
import { uploadFactory } from '../../services/factories/image/upload-factory';
import { Multipart } from "@fastify/multipart";

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
    const updateUserSchema = z.object({
        userId: z.string().min(1),
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        role: z.enum(['MANAGER', 'MEMBER']).optional(),
        admission_date: z.string().optional(),
        phone: z.string().optional(),
        enrollment: z.string().optional(),
        education: z.string().optional(),
        bio: z.string().optional(),
        certifications: z.string().optional(),
        teamId: z.string().optional(),
    });

    try {
        if (!request.isMultipart()) {
            return reply.status(400).send({ message: 'Request is not multipart' });
        }

        const fields: Record<string, string | undefined> = {};
        let fileBuffer: Buffer | undefined;
        let filename: string | undefined;

        for await (const part of request.parts()) {
            if (part.type === 'field') {
             
                fields[part.fieldname] = typeof part.value === "string" ? part.value : undefined;
            } else if (part.type === 'file') {
                filename = part.filename;
                const chunks: Buffer[] = [];
                for await (const chunk of part.file) {
                    chunks.push(chunk);
                }
                fileBuffer = Buffer.concat(chunks);
            }
        }

        const parsedData = updateUserSchema.parse({
            userId: fields.userId,
            name: fields.name,
            email: fields.email,
            role: fields.role,
            admission_date: fields.admission_date,
            phone: fields.phone,
            enrollment: fields.enrollment,
            education: fields.education,
            bio: fields.bio,
            certifications: fields.certifications,
            teamId: fields.teamID,
        });

        let imageId, imageUrl;

        if (fileBuffer && filename) {
            const uploadService = uploadFactory();
            const uploadResponse = await uploadService.upload({
                image: fileBuffer,
                name: filename,
            });

            imageId = uploadResponse.imageId;
            imageUrl = uploadResponse.imageUrl;
        }

        const updateUser = updateUserFactory();
        const { userId, admission_date, ...dataToUpdate } = parsedData;

        const finalDataToUpdate = {
            ...dataToUpdate,
            admission_date: admission_date ? new Date(admission_date) : undefined,
            ...(imageId && { imageId }),
            ...(imageUrl && { imageUrl }),
        };

        await updateUser.execute({
            userId,
            updateData: finalDataToUpdate,
        });

        return reply.status(200).send({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
                message: 'Validation error',
                issues: error.errors,
            });
        }

        if (error instanceof Error && error.message === "usuário não encontrado") {
            return reply.status(404).send({ error: error.message });
        }

        return reply.status(500).send({ error: 'Internal Server Error' });
    }
}
