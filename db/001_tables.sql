CREATE TABLE
    alarms (
        id SERIAL PRIMARY KEY,
        foreign_id VARCHAR UNIQUE,
        title VARCHAR NOT NULL,
        TEXT VARCHAR,
        address VARCHAR,
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
    alarm_returns (
        id SERIAL PRIMARY KEY,
        alarm_id INTEGER NOT NULL,
        returned_at TIMESTAMP NOT NULL,
        notes VARCHAR,
        CONSTRAINT fk_alarm FOREIGN KEY (alarm_id) REFERENCES alarms (id) ON DELETE CASCADE
    );

CREATE INDEX idx_alarm_returns_alarm_id ON alarm_returns (alarm_id);