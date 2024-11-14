import { Prisma, Team, User } from "@prisma/client";
import { UserWithoutPasswordHash } from "./prisma/prisma-users-repository";


export interface UsersRepositoryInterface {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<UserWithoutPasswordHash | null>;
  update(userId: string, updateData: Prisma.UserUpdateInput): Promise<void>;
  delete(userId: string): Promise<void>;
  hasTeam(userId: string): Promise<User & { team: Team | null; managedTeam: Team | null } | null>;
  fetch(): Promise<UserWithoutPasswordHash[]>;
  findUsersWithoutTeams(): Promise<UserWithoutPasswordHash[]>;
  findUsersNotManagingTeams(): Promise<UserWithoutPasswordHash[]>;
}