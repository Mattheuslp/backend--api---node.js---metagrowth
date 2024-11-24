import { Prisma, Team } from "@prisma/client";

export interface TeamsRepositoryInterface {
    findByManagerId(userId: string): Promise<Team | null>
    findById(id: string): Promise<Team | null>
    create(data: Prisma.TeamCreateInput): Promise<Team | null>
    findByName(name: string): Promise<Team | null>
    fetch(): Promise<Team[] | null>
    update(id: string, data: Prisma.TeamUpdateInput): Promise<Team | null>
    delete(id: string): Promise<void>
}