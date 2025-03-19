// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// hier is mijn lijst van links die ik ga gebruiken in dit project
const api = "https://fdnd-agency.directus.app/items/tm_"
const api_users = "users"
const api_profile = "profile"
const api_buddy = "buddy"
const api_lang = "language"
const api_audio = "audio"
const api_playlist = "playlist"
const api_story = "story"
const api_animal = "animal"
const api_season = "season"

// hier fetch ik naar de api
const usersResponse = await fetch(`${api}${api_users}`)
const profileResponse = await fetch(`${api}${api_profile}`)
const buddyResponse = await fetch(`${api}${api_buddy}`)
const languageResponse = await fetch(`${api}${api_lang}`)
const audioResponse = await fetch(`${api}${api_audio}`)
const playlistResponse = await fetch(`${api}${api_playlist}`)
const storyResponse = await fetch(`${api}${api_story}`)
const animalReponse = await fetch(`${api}${api_animal}`)

// Hier haal ik de data terug als JSON data
const usersResponseJSON = await usersResponse.json()
const profileResponseJSON = await profileResponse.json()
const buddyResponseJSON = await buddyResponse.json()
const languageResponseJSON = await languageResponse.json()
const audioResponseJSON = await audioResponse.json()
const playlistResponseJSON = await playlistResponse.json()
const storyResponseJSON = await storyResponse.json()
const animalReponseJSON = await animalReponse.json()

console.log(playlistResponseJSON)

console.log(animalReponseJSON)
// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')


console.log('Let op: Er zijn nog geen routes. Voeg hier dus eerst jouw GET en POST routes toe.')

/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
