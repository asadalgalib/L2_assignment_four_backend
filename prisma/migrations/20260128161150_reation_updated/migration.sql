/*
  Warnings:

  - You are about to drop the column `qualification` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `tutionInfo` on the `TutorProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tutorId,studentId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tutorId]` on the table `TutionInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tutorId]` on the table `TutorProfile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `tutorId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `Categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `Qualification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `Reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `TutionInfo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tutorId` on table `TutorProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'TUTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "tutorId" SET NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "tutorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Qualification" ALTER COLUMN "tutorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "tutorId" SET NOT NULL,
ALTER COLUMN "studentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TutionInfo" ALTER COLUMN "tutorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "qualification",
DROP COLUMN "reviews",
DROP COLUMN "tutionInfo",
ALTER COLUMN "tutorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "Categories_tutorId_idx" ON "Categories"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_tutorId_studentId_key" ON "Reviews"("tutorId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TutionInfo_tutorId_key" ON "TutionInfo"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_tutorId_key" ON "TutorProfile"("tutorId");

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutionInfo" ADD CONSTRAINT "TutionInfo_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("tutorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
