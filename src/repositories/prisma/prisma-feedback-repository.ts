import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { FeedbackRepositoryInterface } from "../feedback-repository-interface";

export class PrismaFeedbackRepository implements FeedbackRepositoryInterface {
  async create(data: Prisma.FeedbackCreateInput) {
    return await prisma.feedback.create({
      data,
    });
  }

  async fetchFeedbacksByTeamManager(managerId: string) {
    const team = await prisma.team.findUnique({
      where: { managerId },
      include: {
        Users: {
          select: { id: true },
        },
      },
    });

    if (!team) {
      throw new Error("Time não encontrado ou você não é um gerente.");
    }

    return await prisma.feedback.findMany({
      where: {
        userId: { in: team.Users.map((user) => user.id) },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true,
            teamId: true,
            admission_date: true,
            phone: true,
            enrollment: true,
            education: true,
            bio: true,
            certifications: true,
          },
        },
      },
    });
  }

  async fetchFeedbacksByUserId(userId: string) {
    return await prisma.feedback.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true,
            teamId: true,
            admission_date: true,
            phone: true,
            enrollment: true,
            education: true,
            bio: true,
            certifications: true,
          },
        },
      },
    });
  }

  async fetchById(id: string) {
    return await prisma.feedback.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    name: true,
                    role: true,
                    enrollment: true,
                    imageUrl: true,
                    team: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
}


  async update(id: string, data: Prisma.FeedbackUpdateInput) {
    return await prisma.feedback.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await prisma.feedback.delete({
      where: { id },
    });
  }
}
