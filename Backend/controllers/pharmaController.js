const mysqlconnexion = require('../models/connexion')
const moment = require ("../config/moment")

const pharMenu = (req, res) => {
    res.render('menu')
}

const pharmAffichagePatients = (req, res) => {
    let requete = "SELECT CONCAT(Nom_Patient, ' ', Prenom_Patient) AS Nom_Patient, noSS, Date_naissance FROM patient order by Nom_Patient, Prenom_Patient"
    mysqlconnexion.query(requete, (err, lignes, champs) => {
        console.log(lignes)
        res.render('patient', {patients : lignes, moment : moment})
    })
}

function pharmAffichageStocks(req, res) {
    res.render('stock')
}

function pharmulairePatient(req, res) {
    res.render('formPat')
}

function pharmAjoutDePatient(req, res) {

    res.render('confirm')
}

/*
    let requeteSQL = "INSERT INTO patient (id, name, message, evaluation) VALUES";
    requeteSQL = requeteSQL + ' (' + msgID + ',"' + msgName + '","' + msgMsg + '",' + msgNote + ')';
    console.log("Requete : "+requeteSQL)
    mysqlconnexion.query( requeteSQL, (err, lignes, champs) => {
        if (!err) {
            console.log("Insertion terminé");
            res.redirect("/LivreOr");
        } else {
            console.log("Erreur lors de l'enregistrment")
            res.send("Erreur ajout : "+JSON.stringify(err))
        }
    })     
}
*/

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks,
    pharmulairePatient,
    pharmAjoutDePatient
}