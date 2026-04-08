/*
  Warnings:

  - You are about to drop the column `open` on the `Contribution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContributionComment" DROP CONSTRAINT "ContributionComment_contributionId_fkey";

-- DropForeignKey
ALTER TABLE "EntriesOnContributions" DROP CONSTRAINT "EntriesOnContributions_contributionId_fkey";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "open";

-- AlterTable
ALTER TABLE "ContributionComment" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ContributionComment" ADD CONSTRAINT "ContributionComment_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntriesOnContributions" ADD CONSTRAINT "EntriesOnContributions_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
