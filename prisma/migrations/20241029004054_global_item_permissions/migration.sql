/*
  Warnings:

  - You are about to drop the `PermissionDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PermissionDetail" DROP CONSTRAINT "PermissionDetail_actionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionDetail" DROP CONSTRAINT "PermissionDetail_entityId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionDetail" DROP CONSTRAINT "PermissionDetail_userId_fkey";

-- DropTable
DROP TABLE "PermissionDetail";

-- CreateTable
CREATE TABLE "GlobalPermission" (
    "id" SERIAL NOT NULL,
    "columnNames" TEXT[],
    "actionId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GlobalPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPermission" (
    "id" SERIAL NOT NULL,
    "columnNames" TEXT[],
    "entryId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ItemPermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GlobalPermission" ADD CONSTRAINT "GlobalPermission_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "PermissionAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalPermission" ADD CONSTRAINT "GlobalPermission_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "PermissionEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalPermission" ADD CONSTRAINT "GlobalPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPermission" ADD CONSTRAINT "ItemPermission_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPermission" ADD CONSTRAINT "ItemPermission_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "PermissionAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPermission" ADD CONSTRAINT "ItemPermission_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "PermissionEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPermission" ADD CONSTRAINT "ItemPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
