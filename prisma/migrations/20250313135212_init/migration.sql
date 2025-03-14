-- CreateTable
CREATE TABLE "UserBalance" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBalance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBalance" ADD CONSTRAINT "UserBalance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
