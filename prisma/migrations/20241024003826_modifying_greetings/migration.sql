/*
  Warnings:

  - You are about to drop the `GreetingResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GreetingResponse" DROP CONSTRAINT "GreetingResponse_greetingId_fkey";

-- AlterTable
ALTER TABLE "Greeting" ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "text" TEXT;

-- DropTable
DROP TABLE "GreetingResponse";

-- AddForeignKey
ALTER TABLE "Greeting" ADD CONSTRAINT "Greeting_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Greeting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
