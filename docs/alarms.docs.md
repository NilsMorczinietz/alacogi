# Alarm API Dokumentation

Diese Dokumentation beschreibt die verfügbaren Endpunkte zur Übermittlung von Alarmdaten an das System.

---

## Übersicht

| Methode | Pfad               | Beschreibung                                                   |
| ------- | ------------------ | -------------------------------------------------------------- |
| POST    | `/alarms`          | Erstelle einen Alarm mit vollständigen oder historischen Daten |
| POST    | `/alarms/incoming` | Echtzeit-Alarm mit vollständigen Informationen                 |
| POST    | `/alarms/announce` | Echtzeit-Alarm ohne bekannte Details                           |

---

## POST `/alarms`

### Beschreibung:

Speichert einen neuen Alarm. Geeignet für Alarme, die _nicht_ gerade aktuell eintreffen oder nachträglich übermittelt werden.

### Beispiel-Anfrage:

```json
POST /alarms
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "foreign_id": "event-123",
  "title": "FEUER3",
  "text": "Brand in Lagerhalle",
  "address": "Beispielstraße 1, 12345 Musterstadt",
  "lat": 50.123,
  "lng": 8.123,
  "priority": true,
  "notification_type": 0,
  "ts_create": 1721234567
}
```

---

## POST `/alarms/incoming`

### Beschreibung:

Ein aktueller Alarm ist soeben eingegangen und alle nötigen Details sind bekannt.

### Beispiel-Anfrage:

```json
POST /alarms/incoming
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "foreign_id": "event-124",
  "title": "TH1",
  "text": "Baum auf Straße",
  "address": "Waldweg 2, 54321 Beispielstadt",
  "lat": 51.987,
  "lng": 9.321,
  "priority": false,
  "notification_type": 1,
  "ts_create": 1721237890
}
```

---

## POST `/alarms/announce`

### Beschreibung:

Ein Alarm wurde angekündigt, aber es liegen noch _keine_ Details (wie z. B. Einsatzort oder Einsatzart) vor.

### Beispiel-Anfrage:

```json
POST /alarms/announce
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "foreign_id": "event-125",
  "ts_create": 1721240000
}
```

---

## 🔐 Authentifizierung

Alle Endpunkte erfordern einen gültigen statischen Token zur Authentifizierung.

### Varianten:

1. **Per HTTP-Header:**

```http
Authorization: Bearer my-token
```

2. **Alternativ per URL-Parameter:**

```http
POST /alarms/incoming?token=my-token
```

> Hinweis: Beide Varianten sind gleichwertig. Wird beides angegeben, hat der `Authorization`-Header Vorrang.

---

© Alacogi · Stand: Juli 2025
