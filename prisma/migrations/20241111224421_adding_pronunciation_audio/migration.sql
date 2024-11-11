/*
  Warnings:

  - You are about to drop the column `pronunciation` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "pronunciation";

-- CreateTable
CREATE TABLE "Pronunciation" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "text" TEXT,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Pronunciation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pronunciation_entryId_key" ON "Pronunciation"("entryId");

-- AddForeignKey
ALTER TABLE "Pronunciation" ADD CONSTRAINT "Pronunciation_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
