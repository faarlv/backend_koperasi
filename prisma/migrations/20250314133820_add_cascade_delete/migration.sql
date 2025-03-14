/*
  Warnings:

  - You are about to drop the `Installment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoanImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_loanId_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_userId_fkey";

-- DropForeignKey
ALTER TABLE "LoanImage" DROP CONSTRAINT "LoanImage_loanId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserBalance" DROP CONSTRAINT "UserBalance_user_id_fkey";

-- DropTable
DROP TABLE "Installment";

-- DropTable
DROP TABLE "Loan";

-- DropTable
DROP TABLE "LoanImage";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "UserBalance";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalBalance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "duration" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "paidMonths" INTEGER NOT NULL DEFAULT 0,
    "remainingMonths" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_image" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "loan_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_balance_userId_key" ON "user_balance"("userId");

-- AddForeignKey
ALTER TABLE "user_balance" ADD CONSTRAINT "user_balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installment" ADD CONSTRAINT "installment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_image" ADD CONSTRAINT "loan_image_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
