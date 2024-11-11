-- DropIndex
DROP INDEX "Pronunciation_entryId_key";

-- AlterTable
ALTER TABLE "Pronunciation" ALTER COLUMN "url" DROP NOT NULL;
