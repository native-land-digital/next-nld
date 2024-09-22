-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedFromId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedToId_fkey";

-- AlterTable
ALTER TABLE "Relation" ALTER COLUMN "relatedFromId" DROP NOT NULL,
ALTER COLUMN "relatedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedToId_fkey" FOREIGN KEY ("relatedToId") REFERENCES "Polygon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedFromId_fkey" FOREIGN KEY ("relatedFromId") REFERENCES "Polygon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
