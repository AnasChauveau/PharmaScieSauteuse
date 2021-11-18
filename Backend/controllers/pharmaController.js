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

    // Requetes //
    let requeteMedic = "SELECT * FROM medicament" ;
    let requeteMedec = "SELECT * FROM medecin" ;
    let requeteAssurance = "SELECT * FROM assurance" ;

    // Conteneur de résultats des requetes //
    let lesMedics = "";
    let lesMedecins = "";
    let lesAssurances = "";

    mysqlconnexion.query( requeteMedic, (err, lignes, champs) => {
        lesMedics = lignes;
        console.log(lesMedics);
        mysqlconnexion.query( requeteMedec, (err, lignes, champs) => {
            lesMedecins = lignes;
            console.log(lesMedecins);
            mysqlconnexion.query( requeteAssurance, (err, lignes, champs) => {
                lesAssurances = lignes;
                console.log(lesAssurances);
                res.render('formPat', {medicaments : lesMedics, medecins : lesMedecins, assurances : lesAssurances})
            })
        })
    })
    
}

function pharmAjoutDePatient(req, res) {

    console.log(req.body);

    // Patient //
    let nomPatient = req.body.nom;
    let prenomPatient = req.body.prenom;
    let dateNaissance = req.body.date_naissance;
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
        // Requete Patient //
        let requeteSQL_1 = "INSERT INTO patient (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES";
        requeteSQL_1 += ' (' + noSS + ',"' + nomPatient + '","' + prenomPatient + '","' + dateNaissance + '")';
        /*
        // Requete Ordonnance //
        let idPath = "SELECT idPath FROM Pathologie WHERE Nom_Path = "+path;
        let idMede = "SELECT idPath FROM Pathologie WHERE Nom_Path = "+medecin;
        let requeteSQL_2 = "INSERT INTO ordonnance (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES";
        requeteSQL_2 += ' (' + noSS + ',"' + nomPatient + '","' + prenomPatient + '","' + dateNaissance + '")';

        let requeteSQL_3 = "INSERT INTO patient (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES";
        requeteSQL_3 += ' (' + noSS + ',"' + nomPatient + '","' + prenomPatient + '","' + dateNaissance + '")';

        let requetesSQL = [requeteSQL_1, requeteSQL_2, requeteSQL_3];

        for (let t = 0;t < requetesSQL.length;t++) {
            mysqlconnexion.query( requeteSQL_1, (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");
                    res.render("confirm");
                } else {
                    console.log("Erreur lors de l'enregistrment")
                    res.send("Erreur ajout : "+JSON.stringify(err))
                }
            })
        } */    
    }
}

function Chart(req, res) {
    res.render("chart")
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks,
    pharmulairePatient,
    pharmAjoutDePatient,
    Chart
}


