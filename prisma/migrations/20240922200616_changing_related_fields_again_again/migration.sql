/*
  Warnings:

  - Made the column `relatedFromId` on table `Relation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `relatedToId` on table `Relation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedFromId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedToId_fkey";

-- AlterTable
ALTER TABLE "Relation" ALTER COLUMN "relatedFromId" SET NOT NULL,
ALTER COLUMN "relatedToId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedToId_fkey" FOREIGN KEY ("relatedToId") REFERENCES "Polygon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedFromId_fkey" FOREIGN KEY ("relatedFromId") REFERENCES "Polygon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
