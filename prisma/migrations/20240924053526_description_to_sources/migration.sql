/*
  Warnings:

  - You are about to drop the column `description` on the `Polygon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Polygon" DROP COLUMN "description",
ADD COLUMN     "sources" TEXT;
