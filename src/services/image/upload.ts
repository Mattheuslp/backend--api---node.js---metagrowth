import { Readable } from "stream";
import detect from 'magic-bytes.js';
import { randomUUID } from "crypto";
import { ImageRepositoryInterface } from "../../repositories/cloudflare/image-repository-interface";

export interface UploadServiceRequest {
  image: Buffer;
  name: string | undefined;
}

export interface UploadServiceResponse {
  imageUrl: string;
  imageId: string;
}

export class UploadService {
  private imageRepository: ImageRepositoryInterface;

  constructor(imageRepository: ImageRepositoryInterface) {
    this.imageRepository = imageRepository;
  }

  async upload(data: UploadServiceRequest): Promise<UploadServiceResponse> {
    const baseUrl: string = 'https://pub-6e41a6257f484880bcff3d0411b74a7d.r2.dev';
    const typeImage = await this.getTypeImage(data.image);
    const imageName = randomUUID();
 
    if (!typeImage) {
      throw new Error("Tipo de arquivo não suportado.");
    }

    await this.imageRepository.upload(data.image, imageName, typeImage);
    const imageUrl = `${baseUrl}/${imageName}`;


    return {
      imageUrl: imageUrl,
      imageId: imageName,
    };
  }

  async getTypeImage(image: Buffer) {
    const detectedType = detect(image);
    return detectedType.length > 0 ? detectedType[0].mime : null;
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
