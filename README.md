# website

Quelltext von **[maximilian-weber.dev](https://maximilian-weber.dev)**: statisches HTML/CSS, zweisprachig (EN/DE), ohne Cookies, Tracking oder externe Ressourcen.

```
index.html          Startseite (EN + DE nebeneinander via lang-Attribut)
impressum.html      Impressum & Datenschutz
404.html            Fehlerseite für unbekannte Adressen
assets/style.css    Design (hell/dunkel automatisch, Druckansicht)
assets/main.js      Sprachumschaltung + Foto-Fallback
assets/img/         Portrait
nginx.conf          nginx-Konfiguration im Image (Security-Header, gekürzte IPs im Log)
Dockerfile          nginx:alpine-Image mit der Seite
```

## Inhalte pflegen

Jeder Text steht zweimal da: `<p lang="en">…</p>` und `<p lang="de">…</p>`. CSS blendet die jeweils andere Sprache aus. Standard ist Englisch (auch ohne JavaScript), die Wahl merkt sich der Browser. Direktlink auf Deutsch: `https://maximilian-weber.dev/?lang=de`

Lokal ansehen: `python3 -m http.server 8000`, dann http://localhost:8000

## Image

Bei jedem Push auf `main` baut GitHub Actions das Image und veröffentlicht es als `ghcr.io/mwbr73/website:latest`. Der Container liefert die Seite per HTTP auf Port 80 aus, TLS übernimmt ein Reverse Proxy davor.

## Datenschutz

- Der nginx im Container loggt IP-Adressen nur gekürzt (IPv4 /24, IPv6 /48).
- Strenge Content-Security-Policy: nur eigene Dateien, keine Inline-Skripte oder -Styles.
