import { Prisma, Team } from "@prisma/client";

export interface TeamsRepositoryInterface {
    findByManagerId(userId: string): Promise<Team | null>
    create(data: Prisma.TeamCreateInput): Promise<Team | null>
}