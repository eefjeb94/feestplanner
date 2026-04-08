# Feestplanner — Setup instructies

## Stap 1: Anthropic API-sleutel aanmaken
1. Ga naar https://console.anthropic.com
2. Maak een account aan (of log in)
3. Ga naar "API Keys" → klik "Create Key"
4. Kopieer de sleutel (begint met sk-ant-...)
5. Bewaar hem veilig — je ziet hem maar één keer

## Stap 2: Netlify account aanmaken
1. Ga naar https://netlify.com
2. Klik "Sign up" → gebruik je Google of GitHub account
3. Gratis plan is voldoende

## Stap 3: Website uploaden
1. Ga naar https://app.netlify.com
2. Klik "Add new site" → "Deploy manually"
3. Sleep de volledige map (feestplanner-v2) of de zip erin
4. Netlify geeft je een willekeurige URL (bijv. happy-balloon-123.netlify.app)

## Stap 4: API-sleutel instellen (BELANGRIJK)
1. In Netlify: ga naar jouw site → "Site configuration" → "Environment variables"
2. Klik "Add a variable"
3. Key: ANTHROPIC_API_KEY
4. Value: jouw sleutel (sk-ant-...)
5. Klik "Save"
6. Ga naar "Deploys" → klik "Trigger deploy" → "Deploy site"

✅ Nu werkt de "Genereer" knop!

## Stap 5: Eigen domeinnaam (optioneel)
1. Koop een domeinnaam bij bijv. transip.nl of one.com (~€10/jaar)
2. In Netlify: "Domain management" → "Add custom domain"
3. Volg de instructies om je DNS in te stellen

## Teksten aanpassen
- Klik op "✏️ Bewerken" rechtsboven op de website
- Klik op elke tekst die je wil aanpassen en typ
- Klik "Wijzigingen opslaan" — ze worden bewaard in de browser
- Voor permanente aanpassingen: bewerk de HTML-bestanden direct

## Affiliate links instellen
- Meld je aan bij bol.com Partnerprogramma: https://partnernetwerk.bol.com
- Vervang in index.html de bol.com links met jouw affiliate links
- Zelfde voor Amazon, of andere winkels

## Verdienmodel samenvatting
1. Affiliate commissie (bol.com 4-8%, Action via Daisycon)
2. Gesponsorde partner-slot bovenaan de pagina (€200-500/maand)
3. Google Adsense zodra je 1000+ bezoekers/maand hebt
4. Lokale leadgeneratie (springkasteel verhuur etc.)

## Vragen?
Stuur een bericht via het contactformulier op de website.
