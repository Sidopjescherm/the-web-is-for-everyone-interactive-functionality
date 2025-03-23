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


// console.log(animalReponseJSON)


// hier komt een test voor Anouk:
  // app.get('/detail/:id'), async function (request, response) {
  //   const apiWebinars = 'webinars'
  //   const webinarFields = '?fields=title,thumbnail,date,categories.*.*,speakers.*.*'
    
  //   const viewField = "?fields=views,id"
  //   const viewsFieldResponse = await fetch(`${apiEndpoint}${apiWebinars}${viewField}&filter={%22id%22:${request.params.id}}`)
  // }
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

// ----------------------------------------------Hier is de landingspagina----------------------------------------------
app.get('/', async function (request, response) {
  // hier zet ik mijn verhalen neer 
  const storyResponse = await fetch(`${api}${api_story}`)  
  const playlistResponse = await fetch(`${api}${api_playlist}`)

  // ik wil bekijken of de juiste stories worden opgehaald
  const storyResponseJSON = await storyResponse.json()
  const playlistResponseJSON = await playlistResponse.json()

  // console.log(storiesResponseJSON)

  response.render('index.liquid', 
    {stories: storyResponseJSON.data,
     playlists: playlistResponseJSON.data
    })
})

// hier voeg ik een post request toe om een nieuwe playlist te maken en toe te voegen bij de bestaande playlists
app.post('/', async function (request, response) {
  // console.log(request.body)
  // eerst fetch ik naar de juiste informatie
  const results = await fetch('https://fdnd-agency.directus.app/items/tm_playlist',{
    method: 'POST',
    body: JSON.stringify({
      title: request.body.title
    }),
    headers: {
      'Content-type':'application/json;charset=UTF-8'
    }
  });
  //console.log(results)
  response.redirect(303, '/')
})

// Hiermee verwijder je een playlist die is gemaakt
app.post('/delete/:id', async function (request, response) {
  // console.log(request.body)

  const deleteplaylist = await fetch(`https://fdnd-agency.directus.app/items/tm_playlist/${request.params.id}`,{
    method: 'DELETE',

  });
  // console.log(deleteplaylist)

  response.redirect(303, '/')
})


// ----------------------------------------------Hier is de Detailpagina----------------------------------------------
app.get('/stories/:id', async function (request, response) {
  // hier haal ik de verhalen op uit de database
  const storyResponse = await fetch(`${api}${api_story}/?filter={"id":"${request.params.id}"}`)
  const storyResponseJSON = await storyResponse.json()
  // console.log(storyResponseJSON)
  // Hier haal ik de buddies uit de database
  const animalReponse = await fetch(`${api}${api_animal}`)
  const animalReponseJSON = await animalReponse.json()
  console.log(animalReponseJSON)
})

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
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
