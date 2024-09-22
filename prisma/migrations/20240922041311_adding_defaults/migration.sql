/*
  Warnings:

  - Made the column `name` on table `Polygon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Polygon" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "geometry" DROP NOT NULL;
