/*
  Warnings:

  - Added the required column `imageId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
