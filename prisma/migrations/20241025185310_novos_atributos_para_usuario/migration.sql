-- AlterTable
ALTER TABLE "users" ADD COLUMN     "admission_date" TIMESTAMP(3),
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "certifications" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "enrollment" TEXT,
ADD COLUMN     "function" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "teamId" TEXT;

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
