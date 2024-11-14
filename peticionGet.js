const https = require('node:https')
const { json } = require('stream/consumers')
const url = 'https://reclutamiento-dev-procontacto-default-rtdb.firebaseio.com/reclutier.json'

https.get(url, (response) => {
    let data = ''

    // evento 'data' se activa cada vez que se recibe un fragmento de datos del servidor
    response.on('data', (chunk) => {
        data += chunk // se añade un fragmento o chunk a la variable data hasta completar la respuesta
    })

    // evento 'end' se activa cuando se recibe toda la respuesta
    response.on('end', () => {
        // parsea el json recibido a un objeto de javascript
        const registros = JSON.parse(data)
        console.log(registros)
    })

}).on('error', (error) => {
    console.error('error a manejar la solicitud ' + error)
})