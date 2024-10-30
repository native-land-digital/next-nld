-- DropForeignKey
ALTER TABLE "Line" DROP CONSTRAINT "Line_entryId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_entryId_fkey";

-- DropForeignKey
ALTER TABLE "Polygon" DROP CONSTRAINT "Polygon_entryId_fkey";

-- CreateTable
CREATE TABLE "PermissionAction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PermissionAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PermissionEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionDetail" (
    "id" SERIAL NOT NULL,
    "columnName" TEXT,
    "appliesToAll" BOOLEAN NOT NULL,
    "actionId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PermissionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Line" ADD CONSTRAINT "Line_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polygon" ADD CONSTRAINT "Polygon_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDetail" ADD CONSTRAINT "PermissionDetail_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "PermissionAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDetail" ADD CONSTRAINT "PermissionDetail_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "PermissionEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionDetail" ADD CONSTRAINT "PermissionDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
