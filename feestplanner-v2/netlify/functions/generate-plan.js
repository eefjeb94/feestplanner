exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { age, theme, location, kids, budget, style, extra, name } = body;

  if (!age || !theme || !location || !kids || !budget || !style) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const childLabel = name || 'het kind';
  const ageNum = parseInt(age);
  const ageNote = ageNum <= 1
    ? 'Dit is een feestje voor een baby van 1 jaar. Het feest is eigenlijk voor de ouders en familie. Houd alles heel eenvoudig, veilig en kortdurend. Geen competitie-spelletjes. Activiteiten zijn zintuiglijk en passief.'
    : ageNum <= 2
    ? 'Dit is voor een dreumes van 2 jaar. Heel korte activiteiten, veel herhaling, rustige sfeer. Geen spelletjes met regels.'
    : ageNum <= 3
    ? 'Dit is voor een peuter van 3 jaar. Simpele, korte activiteiten. Knutselen werkt goed maar houd het simpel.'
    : '';

  const prompt = `Je bent een creatieve, stijlvolle kinderfeest planner. Schrijf in het Nederlands. Maak een volledig, coherent en realistisch feestplan. ${ageNote}

Input:
- Naam kind: ${childLabel}
- Leeftijd: ${age} jaar
- Thema: ${theme}
- Locatie: ${location}
- Aantal kinderen: ${kids}
- Budget: ${budget}
- Stijl: ${style}
- Extra wensen: ${extra || 'geen'}

Geef het plan EXACT in dit formaat. Gebruik de secties letterlijk:

CONCEPT
[3-4 zinnen over de visuele sfeer. Specifiek voor dit thema en deze leeftijd. Geen generieke tekst.]

KLEURENPALET
Hoofdkleuren: [3 kleuren met naam]
Materialen: [2-3 materialen]
Sfeer: [1 zin]

SETUP
Entree: [wat + hoe stylen, 2-3 zinnen]
Tafeldecoratie: [wat + hoe, 2-3 zinnen]
Fotopunt: [wat + hoe, 2-3 zinnen]
Activiteitenhoek: [wat + hoe, 2-3 zinnen]

BOODSCHAPPENLIJST
Must-haves:
- [specifiek item]: ~€[prijs]
- [specifiek item]: ~€[prijs]
- [specifiek item]: ~€[prijs]
- [specifiek item]: ~€[prijs]
- [specifiek item]: ~€[prijs]
Nice-to-haves:
- [specifiek item]: ~€[prijs]
- [specifiek item]: ~€[prijs]
Totaal: ~€[totaal]

DIY VS KOPEN
Zelf maken: [2 concrete zaken]
Beter kopen: [2 concrete zaken + reden]

ETEN EN TAART
Hapjes: [3 leeftijdsgeschikte hapjes]
Taart: [1 concreet concept]

ACTIVITEITEN
1. [naam]: [beschrijving, leeftijdsgericht, 2 zinnen]
2. [naam]: [beschrijving, 2 zinnen]
3. [naam]: [beschrijving, 2 zinnen]

TIJDLIJN
1 week voor:
- [taak]
- [taak]
- [taak]
Dag ervoor:
- [taak]
- [taak]
Dag zelf:
- [taak]
- [taak]
- [taak]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 502, body: JSON.stringify({ error: 'API error: ' + err }) };
    }

    const data = await response.json();
    const text = data.content?.map(b => b.text || '').join('') || '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: text })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
