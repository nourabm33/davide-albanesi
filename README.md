# Davide Albanesi — Sito Web

Sito one-page elegante e responsive per **Davide Albanesi**, consulente organizzativo per bar, cocktail bar, locali ed eventi.

## Caratteristiche

- **Hero full-screen** con video di sfondo in loop (autoplay silenzioso, `playsinline`), overlay scuro per la leggibilità e immagine di fallback per i dispositivi che non supportano l'autoplay.
- Sezioni: introduzione, **Il Metodo** (timeline a 6 fasi), **A chi è rivolta**, **Cosa puoi ottenere**, **Filosofia** e **Call to action** finale con contatti WhatsApp / Email.
- Design premium con typography serif (Cormorant Garamond) + sans (Jost), palette oro/scuro.
- Completamente **responsive** con menu mobile e animazioni leggere on-scroll (IntersectionObserver, con rispetto di `prefers-reduced-motion`).
- Sito **statico** (HTML/CSS/JS puri), nessuna build necessaria.

## Struttura

```
index.html
assets/
  css/styles.css
  js/script.js
  img/            immagini (bar, team, eventi, mixology, fallback)
  video/hero.mp4  video di sfondo dell'hero
```

## Sviluppo locale

Basta un qualsiasi server statico, ad esempio:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Deploy

Essendo un sito statico può essere pubblicato su GitHub Pages, Netlify, Vercel o qualsiasi hosting statico.

## Personalizzazione contatti

Numero WhatsApp, email e telefono sono in `index.html` nella sezione `#contatti` (attualmente valori placeholder da sostituire).
