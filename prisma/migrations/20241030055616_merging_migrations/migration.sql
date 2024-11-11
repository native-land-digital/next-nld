-- DropForeignKey
ALTER TABLE "Polygon" DROP CONSTRAINT "Polygon_entryId_fkey";

-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "osmId" TEXT,
ADD COLUMN     "osmType" TEXT;

-- CreateTable
CREATE TABLE "IssueMedia" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "issueCommentId" INTEGER NOT NULL,

    CONSTRAINT "IssueMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IssueComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IssueCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnIssues" (
    "id" SERIAL NOT NULL,
    "issueId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnIssues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnIssues" (
    "id" SERIAL NOT NULL,
    "issueId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnIssues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL DEFAULT true,
    "entryId" INTEGER,
    "authorId" INTEGER,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoriesOnIssues_issueId_categoryId_idx" ON "CategoriesOnIssues"("issueId", "categoryId");

-- CreateIndex
CREATE INDEX "UsersOnIssues_issueId_userId_idx" ON "UsersOnIssues"("issueId", "userId");

-- AddForeignKey
ALTER TABLE "Polygon" ADD CONSTRAINT "Polygon_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueMedia" ADD CONSTRAINT "IssueMedia_issueCommentId_fkey" FOREIGN KEY ("issueCommentId") REFERENCES "IssueComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueComment" ADD CONSTRAINT "IssueComment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueComment" ADD CONSTRAINT "IssueComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnIssues" ADD CONSTRAINT "CategoriesOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnIssues" ADD CONSTRAINT "CategoriesOnIssues_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "IssueCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnIssues" ADD CONSTRAINT "UsersOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnIssues" ADD CONSTRAINT "UsersOnIssues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
