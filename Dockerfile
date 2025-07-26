# 1. Basis-Image mit Node.js
FROM node:20

# 2. psql installieren für SQL-Migrationen
RUN apt-get update && apt-get install -y postgresql-client

# 2. Arbeitsverzeichnis im Container
WORKDIR /app

# 3. package.json und package-lock.json kopieren
COPY package*.json ./

# 4. Abhängigkeiten installieren
RUN npm install

# 5. Quellcode kopieren
COPY . .

# 6. TypeScript bauen (optional, wenn du ts-node verwendest, kann man das auch weglassen)
RUN npm run build

# 7. Port freigeben (z.B. 8080, je nachdem wo dein Server läuft)
EXPOSE 8080

# 8. Startbefehl (wenn du ts-node im Produktivmodus nutzt, solltest du besser vorher kompilieren)
CMD ["node", "dist/index.js"]
