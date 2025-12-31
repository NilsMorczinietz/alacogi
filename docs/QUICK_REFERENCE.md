# Quick Reference - Deployment Commands

## 🚀 Deployment

### Via GitHub Actions

1. Gehe zu deinem GitHub Repository
2. Klicke auf **Actions** Tab
3. Wähle **"Deploy to Production"**
4. Klicke **"Run workflow"**
5. Wähle Optionen:
   - **Environment**: production / staging
   - **Run migrations**: true / false (bei DB-Änderungen)
   - **Skip tests**: false (empfohlen)
6. Starte den Workflow und verfolge den Fortschritt

## 🗄️ Database Migrations

### Migration erstellen

```bash
# Automatisch aus Entity-Änderungen
npm run migration:generate -- src/migrations/MigrationName

# Manuell erstellen
npm run migration:create -- src/migrations/MigrationName
```

### Migrations ausführen

```bash
# Lokal
npm run migration:run

# Production (auf Server)
docker-compose -f docker/docker-compose.prod.yml exec backend npm run migration:run
```

### Migration rückgängig

```bash
npm run migration:revert
```

### Status anzeigen

```bash
npm run migration:show
```

## 📊 Server Management

### SSH Login

```bash
ssh root@217.160.234.172
```

### Container Status

```bash
cd /opt/alacogi
docker-compose -f docker/docker-compose.prod.yml ps
```

### Logs anzeigen

```bash
# Alle
docker-compose -f docker/docker-compose.prod.yml logs -f

# Nur Backend
docker-compose -f docker/docker-compose.prod.yml logs -f backend

# Letzte 100 Zeilen
docker-compose -f docker/docker-compose.prod.yml logs --tail=100
```

### Container neu starten

```bash
docker-compose -f docker/docker-compose.prod.yml restart backend
```

### Container stoppen/starten

```bash
docker-compose -f docker/docker-compose.prod.yml down
docker-compose -f docker/docker-compose.prod.yml up -d
```

## 🔄 Backup & Rollback

### Automatisches Backup

Backups werden automatisch bei jedem GitHub Actions Deployment erstellt in `/opt/alacogi-backups/`.

### Automatischer Rollback

Bei Deployment-Fehler erfolgt automatischer Rollback durch den GitHub Actions Workflow.

### Datenbank-Backup erstellen

```bash
docker-compose -f docker/docker-compose.prod.yml exec postgres \
  pg_dump -U alacogi_prod alacogi_prod > backup_$(date +%Y%m%d_%H%M%S).sql
```

## 🐛 Troubleshooting

### Build neu durchführen

```bash
docker-compose -f docker/docker-compose.prod.yml down
docker-compose -f docker/docker-compose.prod.yml build --no-cache
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Alle Container und Images entfernen

```bash
docker-compose -f docker/docker-compose.prod.yml down -v
docker system prune -a
```

### In Container einloggen

```bash
docker-compose -f docker/docker-compose.prod.yml exec backend sh
```

### Datenbank-Shell

```bash
docker-compose -f docker/docker-compose.prod.yml exec postgres \
  psql -U alacogi_prod -d alacogi_prod
```

## 🌐 URLs

- **API**: http://217.160.234.172:3000/api/v1
- **API Docs**: http://217.160.234.172:3000/api/docs
- **Health Check**: http://217.160.234.172:3000/api/v1

## 📦 NPM Scripts

```bash
npm run start:prod         # Start production build
npm run build              # Build application
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
npm run migration:show     # Show migration status
npm test                   # Run tests
npm run lint               # Run linter
```
