/*
  Warnings:

  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Application";

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);
