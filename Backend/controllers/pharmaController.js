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

    console.log(req.body);

    // Patient //
    let nomPatient = req.body.nom;
    let prenomPatient = req.body.prenom;
    let dateNaissance = req.body.dateNaissance;
    let noSS = req.body.noSS;

    // Ordonnance //
    let path = req.body.pathologie;
    let medecin = req.body.medecin;

    // Traitement //
    let medic = req.body.traitement;
    let nbBoite = req.body.nbBoite;

    if (nomPatient == "" || prenomPatient == "" || dateNaissance == "" || noSS == "" ||
    path == "" || medecin == "" || medic == "" || nbBoite == ""){
        console.log("Veuillez remplir tous les champs obligatoires !")
    }else{
        /*
        let requeteSQL = "INSERT INTO patient (id, name, message, evaluation) VALUES";
        requeteSQL = requeteSQL + ' (' + msgID + ',"' + msgName + '","' + msgMsg + '",' + msgNote + ')';
        console.log("Requete : "+requeteSQL)
        mysqlconnexion.query( requeteSQL, (err, lignes, champs) => {
            if (!err) {
                console.log("Insertion terminé");
                res.redirect("confirm");
            } else {
                console.log("Erreur lors de l'enregistrment")
                res.send("Erreur ajout : "+JSON.stringify(err))
            }
        })   
        */
    }
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks,
    pharmulairePatient,
    pharmAjoutDePatient
}

