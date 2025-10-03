/*
  Warnings:

  - You are about to drop the column `type` on the `ChatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `contact_info` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Sponsor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sponsor` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `contact_info` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Sponsor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `structure` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Made the column `event_id` on table `ChatRoom` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `layer` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Sponsor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatRoomStructure" AS ENUM ('GROUP', 'DIRECT');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Host', 'Vender', 'Sponser', 'User');

-- DropForeignKey
ALTER TABLE "public"."ChatRoom" DROP CONSTRAINT "ChatRoom_event_id_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "type",
ADD COLUMN     "groupType" "Roles",
ADD COLUMN     "structure" "ChatRoomStructure" NOT NULL,
ALTER COLUMN "event_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
ADD COLUMN     "layer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sponsor" DROP COLUMN "contact_info",
DROP COLUMN "image_url",
DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_url" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'User';

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "contact_info",
DROP COLUMN "image_url",
DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sponsor_userId_key" ON "Sponsor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_userId_key" ON "Vendor"("userId");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoom" ADD CONSTRAINT "ChatRoom_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
