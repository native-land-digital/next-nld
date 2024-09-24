/*
  Warnings:

  - You are about to drop the column `depr_slug` on the `Polygon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Polygon` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Polygon" DROP COLUMN "depr_slug",
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Polygon_slug_key" ON "Polygon"("slug");
