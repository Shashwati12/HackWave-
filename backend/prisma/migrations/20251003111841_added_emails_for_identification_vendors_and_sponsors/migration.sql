/*
  Warnings:

  - You are about to drop the column `fees` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsor" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "fees",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "pledged_amount" DECIMAL(10,2);

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_email_key" ON "Sponsor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
