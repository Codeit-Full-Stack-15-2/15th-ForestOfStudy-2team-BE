/*
  Warnings:

  - You are about to drop the column `created_at` on the `habit_records` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `habit_records` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `habit_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "habit_records" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "is_complete" BOOLEAN NOT NULL DEFAULT false;
