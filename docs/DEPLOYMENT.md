# Production Deployment Guide

Dieses Dokument beschreibt, wie du dein Alacogi Backend via **GitHub Actions** auf deinem IONOS Server deployen kannst.

## 📋 Voraussetzungen

### Auf dem IONOS Server (217.160.234.172):

- Docker und Docker Compose installiert
- Firewall-Regeln für Port 3000 (Backend) und 5432 (Postgres)
- SSH-Zugriff für GitHub Actions

## 🚀 Deployment via GitHub Actions

**Vorteile:**

- Automatisierte Tests vor Deployment
- Automatische Backups
- Rollback-Funktion bei Fehler
- Deployment-Historie in GitHub
- Kontrolliertes Deployment zu selbst gewählten Zeitpunkten

### Setup:

1. **GitHub Secrets einrichten:**

   Gehe zu deinem GitHub Repository → Settings → Secrets and variables → Actions

   Füge folgende Secrets hinzu:

   ```
   SSH_PRIVATE_KEY: [Dein privater SSH-Key]
   SERVER_HOST: 217.160.234.172
   SERVER_USER: root
   ```

2. **SSH-Key generieren (falls noch nicht vorhanden):**

   ```bash
   ssh-keygen -t ed25519 -C "github-actions"
   ```

   Public Key auf Server kopieren:

   ```bash
   ssh-copy-id root@217.160.234.172
   ```

3. **Deployment durchführen:**
   - Gehe zu deinem GitHub Repository
   - Klicke auf den **Actions** Tab
   - Wähle den Workflow **"Deploy to Production"**
   - Klicke auf **"Run workflow"**
   - Wähle die gewünschten Optionen:
     - **Environment**: production (oder staging)
     - **Run migrations**: Yes (wenn DB-Änderungen vorhanden)
     - **Skip tests**: No (Tests sollten immer laufen)
   - Klicke auf **"Run workflow"**
   - Workflow wird gestartet und du kannst den Fortschritt live verfolgen

### Workflow-Features:

- ✅ Automatische Tests vor Deployment
- ✅ Automatisches Backup vor Deployment
- ✅ Health Check nach Deployment
- ✅ Automatischer Rollback bei Fehler
- ✅ Deployment-Summary mit allen Details

## 🗄️ Datenbank-Migrations Management

### Migration erstellen (bei Änderungen an Entities)

1. **Automatische Migration generieren:**

   ```bash
   npm run migration:generate -- src/migrations/MigrationName
   ```

   TypeORM vergleicht deine Entities mit der DB und erstellt die Migration automatisch.

2. **Manuelle Migration erstellen:**
   ```bash
   npm run migration:create -- src/migrations/MigrationName
   ```

### Migrations anwenden

**Lokal (Development):**

```bash
npm run migration:run
```

**Auf dem Server:**

```bash
docker-compose -f docker/docker-compose.prod.yml exec backend npm run migration:run
```

### Migrations rückgängig machen

```bash
npm run migration:revert
```

### Migrations-Status anzeigen

```bash
npm run migration:show
```

## 🔧 Server-Setup (Erstmalige Einrichtung)

### 1. Docker installieren

```bash
ssh root@217.160.234.172

# Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Docker Compose installieren
apt-get update
apt-get install docker-compose-plugin -y

# Docker ohne sudo ausführen können
usermod -aG docker $USER
```

### 2. Firewall konfigurieren

```bash
# UFW Firewall aktivieren
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Backend API
ufw enable
```

### 3. Verzeichnisstruktur erstellen

```bash
mkdir -p /opt/alacogi
mkdir -p /opt/alacogi-backups
mkdir -p /opt/alacogi/docker/backups
```

### 4. .env.production Datei erstellen

```bash
cd /opt/alacogi
nano .env.production
```

Inhalt (WICHTIG: Sichere Passwörter verwenden!):

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=alacogi_prod
DB_PASSWORD=SEHR_SICHERES_PASSWORT_HIER
DB_DATABASE=alacogi_prod

# JWT
JWT_SECRET=SEHR_LANGER_ZUFÄLLIGER_STRING_HIER
JWT_REFRESH_SECRET=ANDERER_LANGER_ZUFÄLLIGER_STRING_HIER
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Divera
DIVERA_ACCESS_KEY=your_divera_access_key_here

# App
PORT=3000
NODE_ENV=production
```

Sichere Secrets generieren:

```bash
# JWT Secrets generieren
openssl rand -base64 64
openssl rand -base64 64
```

### 5. Ersten Deployment durchführen

Nach dem Server-Setup:

- Gehe zu GitHub Actions
- Starte das erste Deployment via "Run workflow"
- Der Workflow erstellt automatisch alle benötigten Verzeichnisse und deployt die App

## 📊 Monitoring und Logs

### Container-Status prüfen

```bash
ssh root@217.160.234.172
cd /opt/alacogi
docker-compose -f docker/docker-compose.prod.yml ps
```

### Logs anzeigen

**Alle Services:**

```bash
docker-compose -f docker/docker-compose.prod.yml logs -f
```

**Nur Backend:**

```bash
docker-compose -f docker/docker-compose.prod.yml logs -f backend
```

**Nur Datenbank:**

```bash
docker-compose -f docker/docker-compose.prod.yml logs -f postgres
```

### Container neu starten

```bash
docker-compose -f docker/docker-compose.prod.yml restart backend
```

## 🔄 Backup & Restore

### Automatisches Backup

Backups werden automatisch bei jedem Deployment erstellt in `/opt/alacogi-backups/`.

### Manuelles Datenbank-Backup

```bash
ssh root@217.160.234.172

# Backup erstellen
docker-compose -f /opt/alacogi/docker/docker-compose.prod.yml exec postgres \
  pg_dump -U alacogi_prod alacogi_prod > /opt/alacogi/docker/backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Datenbank wiederherstellen

```bash
# Backup hochladen
scp backup_20251231_120000.sql root@217.160.234.172:/tmp/

# Auf Server:
docker-compose -f /opt/alacogi/docker/docker-compose.prod.yml exec -T postgres \
  psql -U alacogi_prod -d alacogi_prod < /tmp/backup_20251231_120000.sql
```

## 🐛 Troubleshooting

### Container startet nicht

1. **Logs prüfen:**

   ```bash
   docker-compose -f docker/docker-compose.prod.yml logs backend
   ```

2. **Container-Status:**

   ```bash
   docker ps -a
   ```

3. **Neu bauen:**
   ```bash
   docker-compose -f docker/docker-compose.prod.yml down
   docker-compose -f docker/docker-compose.prod.yml up --build -d
   ```

### Datenbank-Verbindungsfehler

1. **Postgres Status:**

   ```bash
   docker-compose -f docker/docker-compose.prod.yml ps postgres
   ```

2. **Manuell in DB einloggen:**
   ```bash
   docker-compose -f docker/docker-compose.prod.yml exec postgres \
     psql -U alacogi_prod -d alacogi_prod
   ```

### Migration-Fehler

1. **Migration-Status prüfen:**

   ```bash
   docker-compose -f docker/docker-compose.prod.yml exec backend npm run migration:show
   ```

2. **Letzte Migration zurückrollen:**
   ```bash
   docker-compose -f docker/docker-compose.prod.yml exec backend npm run migration:revert
   ```

## 🔒 Security Best Practices

### Auf dem Server:

1. **Root-Login via SSH deaktivieren:**

   ```bash
   nano /etc/ssh/sshd_config
   # PermitRootLogin no
   systemctl restart sshd
   ```

2. **Dedizierter User erstellen:**

   ```bash
   adduser alacogi
   usermod -aG docker alacogi
   chown -R alacogi:alacogi /opt/alacogi
   ```

3. **Fail2ban installieren:**

   ```bash
   apt-get install fail2ban -y
   systemctl enable fail2ban
   ```

4. **Regelmäßige Updates:**
   ```bash
   apt-get update && apt-get upgrade -y
   ```

### In der Anwendung:

- ✅ JWT Secrets regelmäßig rotieren
- ✅ Starke Datenbank-Passwörter verwenden
- ✅ HTTPS mit Let's Encrypt einrichten (Reverse Proxy)
- ✅ Rate Limiting aktivieren
- ✅ CORS richtig konfigurieren

## 🚦 Pre-Deployment Checkliste

Vor jedem Production-Deployment:

- [ ] Alle Tests laufen erfolgreich (`npm test`)
- [ ] Code wurde reviewed
- [ ] .env.production ist aktuell
- [ ] Migrations wurden lokal getestet
- [ ] Backup der Production-DB erstellt
- [ ] Aktive Benutzer wurden informiert (wenn nötig)
- [ ] Rollback-Plan bereit

## 📞 Support

Bei Fragen oder Problemen:

- GitHub Issues: [Dein Repository]/issues
- Dokumentation: [Dein Repository]/docs
- Logs prüfen: `docker-compose logs -f`
