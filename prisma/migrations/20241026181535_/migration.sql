/*
  Warnings:

  - A unique constraint covering the columns `[managerId]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "managerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teams_managerId_key" ON "teams"("managerId");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
