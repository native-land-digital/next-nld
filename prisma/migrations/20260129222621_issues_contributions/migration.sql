/*
  Warnings:

  - You are about to drop the `CategoriesOnIssues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IssueCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IssueComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IssueMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnIssues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnIssues" DROP CONSTRAINT "CategoriesOnIssues_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnIssues" DROP CONSTRAINT "CategoriesOnIssues_issueId_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_entryId_fkey";

-- DropForeignKey
ALTER TABLE "IssueComment" DROP CONSTRAINT "IssueComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "IssueComment" DROP CONSTRAINT "IssueComment_issueId_fkey";

-- DropForeignKey
ALTER TABLE "IssueMedia" DROP CONSTRAINT "IssueMedia_issueCommentId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnIssues" DROP CONSTRAINT "UsersOnIssues_issueId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnIssues" DROP CONSTRAINT "UsersOnIssues_userId_fkey";

-- DropTable
DROP TABLE "CategoriesOnIssues";

-- DropTable
DROP TABLE "Issue";

-- DropTable
DROP TABLE "IssueCategory";

-- DropTable
DROP TABLE "IssueComment";

-- DropTable
DROP TABLE "IssueMedia";

-- DropTable
DROP TABLE "UsersOnIssues";

-- CreateTable
CREATE TABLE "ContributionMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "contributionCommentId" INTEGER NOT NULL,

    CONSTRAINT "ContributionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributionComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContributionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributionStage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ContributionStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributionCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ContributionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnContributions" (
    "id" SERIAL NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnContributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnContributions" (
    "id" SERIAL NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnContributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntriesOnContributions" (
    "id" SERIAL NOT NULL,
    "contributionId" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "EntriesOnContributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "stageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributionStage_name_key" ON "ContributionStage"("name");

-- CreateIndex
CREATE INDEX "ContributionStage_name_idx" ON "ContributionStage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ContributionCategory_name_key" ON "ContributionCategory"("name");

-- CreateIndex
CREATE INDEX "ContributionCategory_name_idx" ON "ContributionCategory"("name");

-- CreateIndex
CREATE INDEX "CategoriesOnContributions_contributionId_categoryId_idx" ON "CategoriesOnContributions"("contributionId", "categoryId");

-- CreateIndex
CREATE INDEX "UsersOnContributions_contributionId_userId_idx" ON "UsersOnContributions"("contributionId", "userId");

-- CreateIndex
CREATE INDEX "EntriesOnContributions_contributionId_entryId_idx" ON "EntriesOnContributions"("contributionId", "entryId");

-- AddForeignKey
ALTER TABLE "ContributionMedia" ADD CONSTRAINT "ContributionMedia_contributionCommentId_fkey" FOREIGN KEY ("contributionCommentId") REFERENCES "ContributionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributionComment" ADD CONSTRAINT "ContributionComment_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributionComment" ADD CONSTRAINT "ContributionComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnContributions" ADD CONSTRAINT "CategoriesOnContributions_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnContributions" ADD CONSTRAINT "CategoriesOnContributions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ContributionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnContributions" ADD CONSTRAINT "UsersOnContributions_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnContributions" ADD CONSTRAINT "UsersOnContributions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntriesOnContributions" ADD CONSTRAINT "EntriesOnContributions_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "Contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntriesOnContributions" ADD CONSTRAINT "EntriesOnContributions_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ContributionStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
