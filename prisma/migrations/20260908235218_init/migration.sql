-- CreateTable
CREATE TABLE "habits" (
    "id" SERIAL NOT NULL,
    "study_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_records" (
    "id" SERIAL NOT NULL,
    "habit_id" INTEGER NOT NULL,
    "record_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "habit_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "background" VARCHAR(255) NOT NULL,
    "study_password" VARCHAR(255) NOT NULL,
    "point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_reactions" (
    "id" SERIAL NOT NULL,
    "study_id" INTEGER NOT NULL,
    "emoji" VARCHAR(50) NOT NULL,
    "guest_uuid" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "study_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_records" (
    "id" SERIAL NOT NULL,
    "study_id" INTEGER NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "earned_point" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "study_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habits_study_id_idx" ON "habits"("study_id");

-- CreateIndex
CREATE UNIQUE INDEX "habit_records_habit_id_record_date_key" ON "habit_records"("habit_id", "record_date");

-- CreateIndex
CREATE INDEX "study_reactions_study_id_idx" ON "study_reactions"("study_id");

-- CreateIndex
CREATE INDEX "study_records_study_id_idx" ON "study_records"("study_id");

-- AddForeignKey
ALTER TABLE "habits" ADD CONSTRAINT "habits_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit_records" ADD CONSTRAINT "habit_records_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_reactions" ADD CONSTRAINT "study_reactions_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study_records" ADD CONSTRAINT "study_records_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
