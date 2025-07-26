CREATE TABLE
  IF NOT EXISTS alarms (
    id serial PRIMARY KEY,
    foreign_id TEXT UNIQUE,
    title TEXT NOT NULL,
    TEXT TEXT,
    address TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    priority BOOLEAN DEFAULT FALSE,
    notification_type INTEGER,
    ts_create TIMESTAMP,
    ts_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  IF NOT EXISTS alarm_returns (
    id serial PRIMARY KEY,
    alarm_id INTEGER NOT NULL REFERENCES alarms (id) ON DELETE CASCADE,
    returned_at TIMESTAMP NOT NULL,
    notes TEXT
  );