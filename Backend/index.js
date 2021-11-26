// inclure les dépendances et middlewares 

const express = require('express') 
const ejs = require('ejs')
const mysql = require('mysql')
const iniparser = require('iniparser')
const http = require('http')
const https = require('https')  
const path = require('path')  
const fs = require('fs')

const Routeur = require('./routes/pharmaRoute')


// activation des dépendances 
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Définition du port de l'application  
const port = process.env.port || 3000

// Définition des certificats pour le protocole HTTPS
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'cert.key'))
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'cert.cert'))
const options = { key, cert }


// DÉMARRAGE DE L'APPLICATION
https.createServer(options, app).listen(port, () => {
    console.log(`Serveur HTTPS fonctionnel. Go https://localhost:${port}`)
  })

  
/* partie test pour capture non chiffrée : Wireshark. */
app.listen(port+1, () => {
    console.log(`Serveur HTTP fonctionnel. Go http://localhost:${port+1}`)
  })


app.use('/PharmaScieSauteuse', Routeur);

module.exports = app
// erreur 404 //
app.use((req, res) => {
    res.status(404).render('erreur')
});