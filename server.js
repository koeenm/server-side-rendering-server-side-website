// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// api url om niet per se te hoeven te copy pasten
// const apiUrl = await fetchJson('https://fdnd-agency.directus.app/items/dh_services')

// Stel ejs in als template engine
app.set('view engine', 'ejs')

const apiUrl = 'https://fdnd-agency.directus.app/items/dh_services'
const relatedUrl = await fetchJson(apiUrl)

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Messages laten versturen enzo
app.use(express.urlencoded({extended: true}))

// GET routes
app.get('/', function(request, response) {
    response.render('index')
})

app.get('/detail/:id', function(request, response) {
  fetchJson(apiUrl + '/' + request.params.id).then((initiatiefDetail) => {
    response.render('detail', {
      initiatief: initiatiefDetail.data,
      relatedContent: relatedUrl.data
    })
    console.log(initiatiefDetail)
  })
})

app.get('/vraag', function (request, response) {
 
  // Hier haal je de url op en maak je er een
  // Json file van ipv een link. Waarna
  // het wordt vernoemd naar apiData
  fetchJson(apiUrl + '?filter={%22type%22:%22vraag%22}').then((apiData) => {

      // Deze info wordt daarna
      // meegegeven aan de toegewezen EJS
      response.render('vraag', {
        // .data is belangrijk om er bij te schrijven
        // alle id's zijn een soort van mappen, en door .data te schrijven ga je eigenlijk een map 'dieper'
          initiatiefVraag: apiData.data
      })
      console.log(apiData)
    })
  })

app.get('/aanbod', function (request, response) {
  fetchJson('https://fdnd-agency.directus.app/items/dh_services?filter={%22type%22:%22aanbod%22}').then((apiData) => {
    response.render('aanbod', {
      initiatiefAanbod: apiData.data
    })
    console.log(apiData)
  })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
