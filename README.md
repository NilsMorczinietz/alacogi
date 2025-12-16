# Simple NestJS mit PostgreSQL

## Setup

1. Abhängigkeiten installieren:
```bash
npm install
```

2. PostgreSQL-Container starten:
```bash
docker-compose up -d
```

3. Anwendung starten:
```bash
npm run start:dev
```

## API Endpoints

- `GET http://localhost:3000/users` - Alle User abrufen
- `POST http://localhost:3000/users` - Neuen User erstellen
  ```json
  {
    "name": "Max Mustermann",
    "email": "max@example.com"
  }
  ```
