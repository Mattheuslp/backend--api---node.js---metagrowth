import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from '../../lib/cloudflare'
import { ImageRepositoryInterface } from './image-repository-interface'



export class CloudflareImageRepository implements ImageRepositoryInterface {

    async upload(file: Buffer, fileName: string, typeFile: string) {
 
        const uploadParams = {
            Bucket: 'metagrowth',
            Key: fileName,
            Body: file,
            ContentType: typeFile
        }

        try {
            await r2.send(new PutObjectCommand(uploadParams))
    
        } catch (error) {
            console.error('upload failed', error)
            throw new Error('failed to upload file')
        }

    }

}