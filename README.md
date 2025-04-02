# Interactive Functionality

Ontwerp en maak voor een opdrachtgever een interactieve toepassing die voor iedereen toegankelijk is

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/the-web-is-for-everyone-interactive-functionality/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
Wat ik heb gedaan is een website gemaakt voor Tumi Mundo met als doel audio kunnen afspelen bij de geselecteerde audio. De hoofd functie van mijn website is dat je playlist kan toevoegen en een playlist kan verwijderen. Ik heb een website gemaakt waar je meerdere verhalen kan zien, luisteren en terug kan naar alle verhalen. Hier is de link naar de live website:
https://the-web-is-for-everyone-interactive-ici4.onrender.com/
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->

## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Mijn user-story is het toevoegen van nummers en playlists in de data-base. Het toevoegen van de nummers is helaas niet gelukt en de functie om nummers aan te zetten is er. Wat Wel mogelijk is in de website is het toevoegen en verwijderen van playlists. 

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
Wat ik heb gebruikt is progressive enhancement in deze leertaak. In de week van 24 t/m 28 maart hebben we geleerd over Progressive enhancement ik heb dit proberen te implementeren. Dit heb ik gedaan bij mijn aan en uit knop bij de verhalen

Ik heb met behulp van @suustenvoorde de audio track verbinden met de juiste story en de audio laten tonen. Het is mij nog niet gelukt het transcript te tonen, maar het laat wel zien dat het verbonden is. Goed om hier verder op te gaan.

Hier verbind ik de audio in de server.js:
<code>
  const audioResponse = await fetch(`${api}${api_audio}/?filter={"id":"${request.params.id}"}`)
  const audioResponseJSON = await audioResponse.json()
</code> 

Hier laat ik in de liquid file zien dat ik het verbind op de juiste wijze:
        <audio  controls src="https://fdnd-agency.directus.app/assets/{{ audio.audio_file }}">
        <track
        default
        src="https://fdnd-agency.directus.app/assets/{{ story.transcript }}" />

playlists toevoegen en verwijderen doe je met een post systeem dat jouw data toevoegd en ook weer verwijderd. Met de code hieronder voeg je een playlist toe.

    app.post('/', async function (request, response) {
    const results = await fetch('https://fdnd-agency.directus.app/items/tm_playlist',{
      method: 'POST',
      body: JSON.stringify({
        title: request.body.title
      }),
      headers: {
        'Content-type':'application/json;charset=UTF-8'
      }
    });
    response.redirect(303, '/')
   })

  En hier verwijder je weer een playlist

  <code>
        app.post('/delete/:id', async function (request, response) {

      const deleteplaylist = await fetch(`https://fdnd-agency.directus.app/items/tm_playlist/${request.params.id}`,{
        method: 'DELETE',

      });

      response.redirect(303, '/')
    })
  </code>

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
Als met mijn project wil werken moet je eerst node.JS installeren.

Als je node.js hebt geïnstalleerd moet in NPM init op je terminal intypen.

Om de nodige bestanden te installeren in het project ga je bij de terminal in de code bewerking programma dit intypen 'npm install.'

Om nu de server te starten en je code te zien typ je 'npm start.'

Als je de server wilt sluiten druk je 'ctrl' + 'C' om de server te laten stoppen. 


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
