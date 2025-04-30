/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `IssueCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IssueCategory_name_key" ON "IssueCategory"("name");

-- CreateIndex
CREATE INDEX "IssueCategory_name_idx" ON "IssueCategory"("name");
