import { CloudflareImageRepository } from "../../../repositories/cloudflare/cloudflare-image-repository"
import { UploadService } from "../../image/upload"


export function uploadFactory() {
    const prismaImageRepository = new CloudflareImageRepository()
    
    const imageService = new UploadService(prismaImageRepository)

    return imageService  
}