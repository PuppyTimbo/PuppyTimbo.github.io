# 🐾 puppytimbo.github.io

Link-Seite von **Puppy Timbo** – im Design von Timbos Website (Lila, Neongrün, Permanent Marker).

| Datei | Wofür |
|---|---|
| `index.html` | Link-Seite: Instagram (Hauptkanal), TikTok, Telegram, Pup Play 101, GitHub, Kurzprofil |
| `pupplay101.html` | Pup Play 101 – 14 Fragen & Antworten (DE/EN) |
| `llms.txt` | Steckbrief für KI-Systeme |
| `robots.txt` / `sitemap.xml` | für Google & KI-Crawler |
| `assets/` | Design, Schriften (lokal, kein Google-Fonts-Tracking), Bilder |

**Bilder:** `assets/avatar.webp` (MX-Beton-Portrait, 01.11.2026), `assets/cover.webp` (Glanz & Graffiti, 03.11.2026), `assets/og-image.png` (Vorschaubild mit Freisteller „Fragend, Kopf schief“).

*Vielfalt macht stark* 🌈


## Google-Tag, Consent & Ereignisse
- Google-Tag `GTM-PMDLR2VM` (Snippet aus GA4) auf allen Seiten.
- **Consent Mode v2:** Standard = alles abgelehnt; Cookie-Manager (`assets/consent.js`) mit Kategorien Statistik (`analytics_storage`) und Marketing (`ad_storage`, `ad_user_data`, `ad_personalization`). „Cookie-Einstellungen“ im Footer.
- **Ereignisse:** `link_click` (link_platform, link_url, link_text), `instagram_click` (→ in GA4 als Schlüsselereignis markieren), `instagram_card_view`, `faq_open` (faq_question), `language_change`, `engaged_30s`, `consent_choice`; Nutzereigenschaft `site_language`.
- Für Zielgruppen/Demografie in GA4: Google Signals aktivieren, benutzerdefinierte Dimensionen für link_platform, faq_question, placement, site_language anlegen.

## Google Search Console
Inhaberschaft per Meta-Tag bestätigen: Code in `sitebuild`/`index.html` im `<head>` als `<meta name="google-site-verification" content="CODE">` eintragen (Platzhalter-Kommentar ist schon drin), dann `sitemap.xml` einreichen.
