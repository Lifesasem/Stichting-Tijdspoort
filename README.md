# Stichting Tijdspoort – website

Een eenvoudige, snelle en professioneel opgezette statische website.

## Starten in VS Code

1. Pak het ZIP-bestand uit.
2. Open de map `tijdspoort-website` in VS Code.
3. Installeer de extensie **Live Server**.
4. Klik met rechts op `index.html`.
5. Kies **Open with Live Server**.

## Structuur

- `index.html` – alle inhoud van de homepage
- `css/style.css` – vormgeving en responsive design
- `js/main.js` – mobiel menu en automatisch jaartal
- `assets/images` – logo's en afbeeldingen

## Aanpassen

Vervang eerst:
- `info@tijdspoort.nl`
- teksten die nog niet definitief zijn
- links naar privacy- en bestuursinformatie
- het tijdelijke logo met het definitieve logo
- eventuele foto's in `assets/images`

## Publiceren

Aanbevolen route:

1. Maak een GitHub repository.
2. Upload/push deze bestanden.
3. Koppel de repository aan Cloudflare Pages.
4. Voeg daarna je eigen domeinnaam toe in Cloudflare.

Voor deze website is geen build command nodig. De outputmap is de hoofdmap van het project.
