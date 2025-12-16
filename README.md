# Simple NestJS mit PostgreSQL

## Quick Start

1. **Setup**
   ```bash
   npm install
   cp .env.example .env  # Anpassen falls nötig
   ```

2. **Development** (lokal, nur DB im Container)
   - VS Code: `Ctrl+Shift+P` → `Tasks: Run Task` → `Dev: Start`
   - Oder: `npm run start:dev`

3. **Production** (alles im Container)
   - VS Code: `Ctrl+Shift+P` → `Tasks: Run Task` → `Docker: Up (Production)`
   - Oder: `docker-compose up --build`

## VS Code Tasks

- **Dev: Start** - Backend lokal starten (Hot-Reload)
- **Docker: Up (Production)** - Alles als Container
- **Docker: Down** - Container stoppen
- **Docker: Logs** - Backend Logs anzeigen

## Doku

API Dokumentation verfügbar unter http://localhost:3000/api/docs