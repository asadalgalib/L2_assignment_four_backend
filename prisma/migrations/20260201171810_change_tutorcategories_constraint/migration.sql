/*
  Warnings:

  - A unique constraint covering the columns `[tutorId,categoryId]` on the table `TutorCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TutorCategories_tutorId_categoryId_key" ON "TutorCategories"("tutorId", "categoryId");
