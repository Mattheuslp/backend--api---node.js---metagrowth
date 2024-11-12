import { Prisma, Team, User } from "@prisma/client";

export interface UsersRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    update(userId: string, updateData: Prisma.UserUpdateInput): Promise<void>;
    delete(userId: string): Promise<void>;
    hasTeam(userId: string): Promise<User & { team: Team | null; managedTeam: Team | null } | null>; 
    fetch(): Promise<User[] | null>
    findUsersWithoutTeams(): Promise<Omit<User, 'password_hash'>[]>;
    findUsersNotManagingTeams(): Promise<Omit<User, 'password_hash'>[]>; 
}
