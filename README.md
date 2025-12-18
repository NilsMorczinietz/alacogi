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
   - Oder: `docker-compose -f docker/docker-compose.yml up --build`

## VS Code Tasks

- **Dev: Start** - Backend lokal starten (Hot-Reload)
- **Docker: Up (Production)** - Alles als Container
- **Docker: Down** - Container stoppen
- **Docker: Logs** - Backend Logs anzeigen

## Doku

API Dokumentation verfügbar unter http://localhost:3000/api/docs

# Jest Integration Tests Setup

## Übersicht

Einfaches Jest Integration Test Setup mit Docker PostgreSQL Test-Datenbank.

## Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Test-Datenbank starten

```bash
docker-compose -f docker/docker-compose.test.yml up -d
```

### 3. Tests ausführen

```bash
# Alle Integration Tests
npm run test:integration

# Watch-Modus
npm run test:integration:watch
```
