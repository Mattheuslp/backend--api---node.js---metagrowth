import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterFactory } from '../../services/factories/user/register-factory';
import { uploadFactory } from '../../services/factories/image/upload-factory';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['MANAGER', 'MEMBER']),
    teamID: z.string().optional(),
    admission_date: z
      .string()
      .optional()
      .transform((date) => (date ? new Date(date) : undefined)),
    phone: z.string().optional(),
    enrollment: z.string().optional(),
    education: z.string().optional(),
    bio: z.string().optional(),
    certifications: z.string().optional(),
  });

  try {

    const data = await request.file();

    if (!data) {
      return reply.status(400).send({ message: 'envio da imagem é obrigátorio' });
    }

    const { file, filename, mimetype, fields } = data;


    const chunks: Buffer[] = [];
    for await (const chunk of file) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);


    const extractedFields = Object.fromEntries(
        Object.entries(fields).map(([key, field]) => [
          key,
          Array.isArray(field)
            ? field.map((f) => 'value' in f ? f.value : f) 
            : 'value' in field!!
            ? field.value 
            : field, 
        ])
      );

    const parsedData = registerBodySchema.parse(extractedFields);

    const registerService = RegisterFactory();
    const uploadService = uploadFactory();


    const uploadResponse = await uploadService.upload({
      image: fileBuffer,
      name: filename,
    });

    const imageId = uploadResponse.imageId;
    const imageUrl = uploadResponse.imageUrl;


    await registerService.execute({
      ...parsedData,
        imageId,
        imageUrl,
    });

    return reply.status(201).send({ message: 'usuário criado com sucesso' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
        issues: error.errors,
      });
    }

    if (error.statusCode && error.message) {
   
        return reply.status(error.statusCode).send({ message: error.message });
      }
   
    
  }
}
