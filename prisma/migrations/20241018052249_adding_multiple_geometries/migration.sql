/*
  Warnings:

  - You are about to drop the column `polygonId` on the `Change` table. All the data in the column will be lost.
  - You are about to drop the column `polygonId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `pronunciation` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `sources` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Polygon` table. All the data in the column will be lost.
  - You are about to drop the column `polygonId` on the `Website` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[entryId]` on the table `Polygon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entryId` to the `Change` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryId` to the `Polygon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Change" DROP CONSTRAINT "Change_polygonId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_polygonId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedFromId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_relatedToId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_polygonId_fkey";

-- DropIndex
DROP INDEX "Change_id_idx";

-- DropIndex
DROP INDEX "Polygon_slug_idx";

-- DropIndex
DROP INDEX "Polygon_slug_key";

-- DropIndex
DROP INDEX "Relation_id_idx";

-- DropIndex
DROP INDEX "User_id_email_idx";

-- DropIndex
DROP INDEX "Website_id_idx";

-- AlterTable
ALTER TABLE "Change" DROP COLUMN "polygonId",
ADD COLUMN     "entryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "polygonId",
ADD COLUMN     "entryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Polygon" DROP COLUMN "category",
DROP COLUMN "color",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "pronunciation",
DROP COLUMN "published",
DROP COLUMN "slug",
DROP COLUMN "sources",
DROP COLUMN "updatedAt",
ADD COLUMN     "entryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "polygonId",
ADD COLUMN     "entryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "geometry" geometry(Point, 4326),
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Line" (
    "id" SERIAL NOT NULL,
    "geometry" geometry(MultiLineString, 4326),
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "sources" TEXT,
    "pronunciation" TEXT,
    "category" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Point_entryId_key" ON "Point"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "Line_entryId_key" ON "Line"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_slug_key" ON "Entry"("slug");

-- CreateIndex
CREATE INDEX "Entry_slug_idx" ON "Entry"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Polygon_entryId_key" ON "Polygon"("entryId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD CONSTRAINT "Change_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedToId_fkey" FOREIGN KEY ("relatedToId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_relatedFromId_fkey" FOREIGN KEY ("relatedFromId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polygon" ADD CONSTRAINT "Polygon_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
