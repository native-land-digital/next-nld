/*
  Warnings:

  - You are about to drop the column `verified` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `verified_text` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "verified",
DROP COLUMN "verified_text";

-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "details" TEXT,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_entryId_key" ON "Verification"("entryId");

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
