/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Qualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutionInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Qualification" DROP CONSTRAINT "Qualification_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "TutionInfo" DROP CONSTRAINT "TutionInfo_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategories" DROP CONSTRAINT "TutorCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategories" DROP CONSTRAINT "TutorCategories_tutorId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Qualification";

-- DropTable
DROP TABLE "Reviews";

-- DropTable
DROP TABLE "TutionInfo";

-- DropTable
DROP TABLE "TutorCategories";

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" "BOOKING" NOT NULL DEFAULT 'CONFIRMED',

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualification" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "institute" TEXT NOT NULL,

    CONSTRAINT "qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutionInfo" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "salary" INTEGER NOT NULL,
    "subjects" TEXT[],
    "availableTime" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "tutionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutorCategories" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "tutorCategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "booking_tutorId_idx" ON "booking"("tutorId");

-- CreateIndex
CREATE INDEX "booking_studentId_idx" ON "booking"("studentId");

-- CreateIndex
CREATE INDEX "qualification_tutorId_idx" ON "qualification"("tutorId");

-- CreateIndex
CREATE INDEX "reviews_tutorId_idx" ON "reviews"("tutorId");

-- CreateIndex
CREATE INDEX "reviews_studentId_idx" ON "reviews"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_tutorId_studentId_key" ON "reviews"("tutorId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "tutionInfo_tutorId_key" ON "tutionInfo"("tutorId");

-- CreateIndex
CREATE INDEX "tutionInfo_tutorId_idx" ON "tutionInfo"("tutorId");

-- CreateIndex
CREATE INDEX "tutorCategories_tutorId_categoryId_idx" ON "tutorCategories"("tutorId", "categoryId");

-- CreateIndex
CREATE INDEX "tutorCategories_tutorId_idx" ON "tutorCategories"("tutorId");

-- CreateIndex
CREATE UNIQUE INDEX "tutorCategories_tutorId_categoryId_key" ON "tutorCategories"("tutorId", "categoryId");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualification" ADD CONSTRAINT "qualification_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutionInfo" ADD CONSTRAINT "tutionInfo_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorCategories" ADD CONSTRAINT "tutorCategories_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutorCategories" ADD CONSTRAINT "tutorCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
