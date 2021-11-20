const mysql = require('mysql')
const iniparser = require('iniparser')

// récupération des paramètres et préparation de connexion à la BDD
let configDB = iniparser.parseSync('./DB.ini')
let db = mysql.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

// connexion à la base de données
db.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})


module.exports = db