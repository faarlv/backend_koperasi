/*
  Warnings:

  - Added the required column `amountPaid` to the `installment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interestFee` to the `loans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDue` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "installment" ADD COLUMN     "amountPaid" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "loans" ADD COLUMN     "interestFee" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalDue" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalPaid" DECIMAL(65,30) NOT NULL DEFAULT 0;
