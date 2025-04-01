/*
  Warnings:

  - You are about to drop the column `isUsed` on the `RegistrationCode` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `RegistrationCode` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RegistrationCode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RegistrationCode" DROP CONSTRAINT "RegistrationCode_userId_fkey";

-- DropIndex
DROP INDEX "RegistrationCode_userId_key";

-- AlterTable
ALTER TABLE "RegistrationCode" DROP COLUMN "isUsed",
DROP COLUMN "usedAt",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "registrationCodeId" INTEGER;

-- CreateTable
CREATE TABLE "CalendarComment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CalendarComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_registrationCodeId_fkey" FOREIGN KEY ("registrationCodeId") REFERENCES "RegistrationCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarComment" ADD CONSTRAINT "CalendarComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
