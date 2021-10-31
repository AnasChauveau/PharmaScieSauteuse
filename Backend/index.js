// inclure les dépendances et middlewares 
const express = require('express') 
const ejs = require('ejs')
const mysql = require('mysql')
const iniparser = require('iniparser')


// récupération des paramètres et préparation de connexion à la BDD
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

// activation des dépendances 
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

// connexion à la base de données
mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})

app.listen(3000, () => console.log('le serveur est prêt.'))