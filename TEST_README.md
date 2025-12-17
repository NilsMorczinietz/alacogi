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
docker-compose -f docker-compose.test.yml up -d
```

### 3. Tests ausführen

```bash
# Alle Integration Tests
npm run test:integration

# Watch-Modus
npm run test:integration:watch
```