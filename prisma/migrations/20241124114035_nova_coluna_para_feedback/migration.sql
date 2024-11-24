/*
  Warnings:

  - Added the required column `givenByUserId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "givenByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_givenByUserId_fkey" FOREIGN KEY ("givenByUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
