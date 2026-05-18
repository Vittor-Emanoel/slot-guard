-- CreateEnum
CREATE TYPE "SeatHoldStatus" AS ENUM ('active', 'confirmed', 'expired', 'released');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "ReservationSeatStatus" AS ENUM ('confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "ReservationEventType" AS ENUM ('hold_created', 'hold_rejected', 'hold_confirmed', 'hold_expired', 'hold_released', 'reservation_created', 'reservation_confirmed', 'reservation_cancelled', 'simulation_started', 'simulation_completed');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration_in_minutes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "row_count" INTEGER NOT NULL,
    "seats_per_row" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "row_label" TEXT NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_sessions" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movie_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat_holds" (
    "id" TEXT NOT NULL,
    "movie_session_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "SeatHoldStatus" NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),
    "released_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),

    CONSTRAINT "seat_holds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "movie_session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_seats" (
    "id" TEXT NOT NULL,
    "reservation_id" TEXT NOT NULL,
    "movie_session_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "hold_id" TEXT,
    "status" "ReservationSeatStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservation_seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_events" (
    "id" TEXT NOT NULL,
    "movie_session_id" TEXT NOT NULL,
    "user_id" TEXT,
    "event_type" "ReservationEventType" NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "seat_id" TEXT,
    "hold_id" TEXT,
    "reservation_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservation_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "movies_title_key" ON "movies"("title");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "seats_room_id_row_label_seat_number_key" ON "seats"("room_id", "row_label", "seat_number");

-- CreateIndex
CREATE INDEX "movie_sessions_movie_id_idx" ON "movie_sessions"("movie_id");

-- CreateIndex
CREATE INDEX "movie_sessions_room_id_idx" ON "movie_sessions"("room_id");

-- CreateIndex
CREATE INDEX "movie_sessions_starts_at_idx" ON "movie_sessions"("starts_at");

-- CreateIndex
CREATE UNIQUE INDEX "movie_sessions_room_id_starts_at_key" ON "movie_sessions"("room_id", "starts_at");

-- CreateIndex
CREATE INDEX "seat_holds_movie_session_id_seat_id_idx" ON "seat_holds"("movie_session_id", "seat_id");

-- CreateIndex
CREATE INDEX "seat_holds_movie_session_id_status_idx" ON "seat_holds"("movie_session_id", "status");

-- CreateIndex
CREATE INDEX "seat_holds_expires_at_idx" ON "seat_holds"("expires_at");

-- CreateIndex
CREATE INDEX "reservations_movie_session_id_idx" ON "reservations"("movie_session_id");

-- CreateIndex
CREATE INDEX "reservations_user_id_idx" ON "reservations"("user_id");

-- CreateIndex
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- CreateIndex
CREATE INDEX "reservation_seats_movie_session_id_seat_id_idx" ON "reservation_seats"("movie_session_id", "seat_id");

-- CreateIndex
CREATE INDEX "reservation_seats_movie_session_id_status_idx" ON "reservation_seats"("movie_session_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_seats_reservation_id_seat_id_key" ON "reservation_seats"("reservation_id", "seat_id");

-- CreateIndex
CREATE INDEX "reservation_events_movie_session_id_idx" ON "reservation_events"("movie_session_id");

-- CreateIndex
CREATE INDEX "reservation_events_user_id_idx" ON "reservation_events"("user_id");

-- CreateIndex
CREATE INDEX "reservation_events_seat_id_idx" ON "reservation_events"("seat_id");

-- CreateIndex
CREATE INDEX "reservation_events_hold_id_idx" ON "reservation_events"("hold_id");

-- CreateIndex
CREATE INDEX "reservation_events_reservation_id_idx" ON "reservation_events"("reservation_id");

-- CreateIndex
CREATE INDEX "reservation_events_event_type_idx" ON "reservation_events"("event_type");

-- CreateIndex
CREATE INDEX "reservation_events_created_at_idx" ON "reservation_events"("created_at");

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_sessions" ADD CONSTRAINT "movie_sessions_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_sessions" ADD CONSTRAINT "movie_sessions_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat_holds" ADD CONSTRAINT "seat_holds_movie_session_id_fkey" FOREIGN KEY ("movie_session_id") REFERENCES "movie_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat_holds" ADD CONSTRAINT "seat_holds_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat_holds" ADD CONSTRAINT "seat_holds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_movie_session_id_fkey" FOREIGN KEY ("movie_session_id") REFERENCES "movie_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_seats" ADD CONSTRAINT "reservation_seats_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_seats" ADD CONSTRAINT "reservation_seats_movie_session_id_fkey" FOREIGN KEY ("movie_session_id") REFERENCES "movie_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_seats" ADD CONSTRAINT "reservation_seats_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_seats" ADD CONSTRAINT "reservation_seats_hold_id_fkey" FOREIGN KEY ("hold_id") REFERENCES "seat_holds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_events" ADD CONSTRAINT "reservation_events_movie_session_id_fkey" FOREIGN KEY ("movie_session_id") REFERENCES "movie_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_events" ADD CONSTRAINT "reservation_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_events" ADD CONSTRAINT "reservation_events_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_events" ADD CONSTRAINT "reservation_events_hold_id_fkey" FOREIGN KEY ("hold_id") REFERENCES "seat_holds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_events" ADD CONSTRAINT "reservation_events_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
