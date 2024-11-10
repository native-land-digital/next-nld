-- CreateTable
CREATE TABLE "GreetingResponse" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "translation" TEXT,
    "usage" TEXT,
    "greetingId" INTEGER NOT NULL,

    CONSTRAINT "GreetingResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GreetingResponse" ADD CONSTRAINT "GreetingResponse_greetingId_fkey" FOREIGN KEY ("greetingId") REFERENCES "Greeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
