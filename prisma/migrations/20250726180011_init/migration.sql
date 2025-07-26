-- CreateTable
CREATE TABLE "alarms" (
    "id" SERIAL NOT NULL,
    "foreign_id" TEXT,
    "title" TEXT NOT NULL,
    "TEXT" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "notification_type" INTEGER,
    "ts_create" TIMESTAMP(3),
    "ts_update" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alarms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alarm_returns" (
    "id" SERIAL NOT NULL,
    "alarm_id" INTEGER NOT NULL,
    "returned_at" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "alarm_returns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alarms_foreign_id_key" ON "alarms"("foreign_id");

-- CreateIndex
CREATE INDEX "alarm_returns_alarm_id_idx" ON "alarm_returns"("alarm_id");

-- AddForeignKey
ALTER TABLE "alarm_returns" ADD CONSTRAINT "alarm_returns_alarm_id_fkey" FOREIGN KEY ("alarm_id") REFERENCES "alarms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
