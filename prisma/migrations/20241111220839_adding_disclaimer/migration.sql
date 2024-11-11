/*
  Warnings:

  - Added the required column `color` to the `IssueCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Polygon" DROP CONSTRAINT "Polygon_entryId_fkey";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "disclaimer" TEXT;

-- AlterTable
ALTER TABLE "IssueCategory" ADD COLUMN     "color" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Polygon" ADD CONSTRAINT "Polygon_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
