/*
  Warnings:

  - You are about to alter the column `api_key` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "password" TEXT,
ALTER COLUMN "api_key" SET DEFAULT nanoid(),
ALTER COLUMN "api_key" SET DATA TYPE VARCHAR(22);
