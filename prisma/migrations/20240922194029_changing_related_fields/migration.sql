/*
  Warnings:

  - You are about to drop the column `polygonId` on the `Relation` table. All the data in the column will be lost.
  - You are about to drop the column `related_polyId` on the `Relation` table. All the data in the column will be lost.
  - Added the required column `relatedFromId` to the `Relation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatedToId` to the `Relation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_polygonId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_related_polyId_fkey";

-- AlterTable
ALTER TABLE "Relation" DROP COLUMN "polygonId",
DROP COLUMN "related_polyId",
ADD COLUMN     "relatedFromId" INTEGER NOT NULL,
ADD COLUMN     "relatedToId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedFromId_fkey" FOREIGN KEY ("relatedFromId") REFERENCES "Polygon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedToId_fkey" FOREIGN KEY ("relatedToId") REFERENCES "Polygon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
