-- CreateTable
CREATE TABLE "Greeting" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "translation" TEXT,
    "usage" TEXT,
    "entryId" INTEGER NOT NULL,

    CONSTRAINT "Greeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Greeting" ADD CONSTRAINT "Greeting_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
