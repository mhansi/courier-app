/*
  Warnings:

  - Added the required column `note` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ShipmentStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "note" TEXT NOT NULL;
