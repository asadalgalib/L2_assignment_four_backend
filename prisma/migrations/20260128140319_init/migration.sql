-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "BOOKING" AS ENUM ('CONFIRMED', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "TutorProfile" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "gender" "GENDER" NOT NULL,
    "qualification" TEXT,
    "tutionInfo" TEXT,
    "reviews" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TutorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutionInfo" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "salary" INTEGER NOT NULL,
    "subjects" TEXT[],
    "availableTime" TEXT NOT NULL,
    "avaiableDay" TEXT[],

    CONSTRAINT "TutionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "exam" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "gpa" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "institute" TEXT NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "category" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "studentId" TEXT,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT,
    "studentId" TEXT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" "BOOKING" NOT NULL DEFAULT 'CONFIRMED',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TutorProfile_tutorId_idx" ON "TutorProfile"("tutorId");

-- CreateIndex
CREATE INDEX "TutionInfo_tutorId_idx" ON "TutionInfo"("tutorId");

-- CreateIndex
CREATE INDEX "Qualification_tutorId_idx" ON "Qualification"("tutorId");

-- CreateIndex
CREATE INDEX "Reviews_tutorId_idx" ON "Reviews"("tutorId");

-- CreateIndex
CREATE INDEX "Reviews_studentId_idx" ON "Reviews"("studentId");

-- CreateIndex
CREATE INDEX "Booking_tutorId_idx" ON "Booking"("tutorId");

-- CreateIndex
CREATE INDEX "Booking_studentId_idx" ON "Booking"("studentId");
