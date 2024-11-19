import { Prisma} from "@prisma/client";

export interface GoalRepositoryInterface {
    create(data: Prisma.GoalCreateInput): Promise<void> 
    update({id, data}: {id: string, data: Prisma.GoalUpdateInput}): Promise<void>
    delete(id: string): Promise<void>
}