const mysqlconnexion = require('../models/connexion')
const moment = require ("../config/moment")

const pharMenu = (req, res) => {
    res.render('menu')
}

const pharmAffichagePatients = (req, res) => {
    let requete = "SELECT CONCAT(Nom_Patient, ' ', Prenom_Patient) AS Nom_Patient, noSS, Date_naissance FROM patient order by Nom_Patient, Prenom_Patient"
    mysqlconnexion.query(requete, (err, lignes, champs) => {
        if (!err) {
            console.log(lignes)
            res.render('patient', {patients : lignes, moment : moment})
        }else{
            res.redirect('erreur')
        }
    })
}

function pharmAffichageStocks(req, res) {
    res.render('stock')
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks
}