/*
  Warnings:

  - Added the required column `geometry` to the `Polygon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Polygon" ADD COLUMN     "geometry" geometry(MultiPolygon, 4326) NOT NULL;
