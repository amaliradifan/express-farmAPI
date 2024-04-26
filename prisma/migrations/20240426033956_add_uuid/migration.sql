/*
  Warnings:

  - The primary key for the `Farmer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Produce` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Produce" DROP CONSTRAINT "Produce_farmerId_fkey";

-- AlterTable
ALTER TABLE "Farmer" DROP CONSTRAINT "Farmer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Farmer_id_seq";

-- AlterTable
ALTER TABLE "Produce" DROP CONSTRAINT "Produce_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "farmerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Produce_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Produce_id_seq";

-- AddForeignKey
ALTER TABLE "Produce" ADD CONSTRAINT "Produce_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
