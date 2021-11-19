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
    let leMoment = moment;

    // Préparations des Requetes //
    let requeteMedic = "SELECT * FROM medicament" ;
    let requeteMedec = "SELECT CONCAT(Nom_Mede, ' ', Prenom_Mede) AS NomMede, idMede FROM medecin" ;
    let requeteAssurance = "SELECT * FROM assurance" ;
    let requetePathologie = "SELECT * FROM pathologie" ;

    // Conteneur du résultats des Requetes //
    let lesMedics = "";
    let lesMedecins = "";
    let lesAssurances = "";
    let lesPathologies = "";

    // Exécution des Requetes //
    mysqlconnexion.query( requeteMedic, (err, lignes, champs) => {
        lesMedics = lignes;
    })
    mysqlconnexion.query( requeteMedec, (err, lignes, champs) => {
        lesMedecins = lignes;
    })
    mysqlconnexion.query( requeteAssurance, (err, lignes, champs) => {
        lesAssurances = lignes;
    })
    mysqlconnexion.query( requetePathologie, (err, lignes, champs) => {
        lesPathologies = lignes;
    })
    setTimeout(() => {res.render('formPat', {moment : leMoment, medicaments : lesMedics, medecins : lesMedecins, assurances : lesAssurances, pathologies : lesPathologies})}, 200)
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
    let duree = req.body.duree;

    if (nomPatient == "" || prenomPatient == "" || dateNaissance == "" || noSS == "" ||
    path == "" || medecin == "" || medic == "" || nbBoite == ""){
        console.log("Veuillez remplir tous les champs obligatoires !")
    }else{
        // Requete Patient //
        let requeteSQL_1 = "INSERT INTO patient (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES";
        requeteSQL_1 += ' (' + noSS + ',"' + nomPatient + '","' + prenomPatient + '","' + dateNaissance + '")';
        
        // Requete Ordonnance //
        let requeteSQL_2 = "INSERT INTO ordonnance (noSS, Id_Path, Id_Mede) VALUES";
        requeteSQL_2 += ' (' + noSS + ',"' + path + '","' + medecin + '")';

        let test = "select noOrd from ordonnance, patient, pathologie where ";

        // Requete Traitement //
        let requeteSQL_3 = "INSERT INTO traitement (Id_Ord, Id_Medic, Nb_Boite, Duree) VALUES";
        requeteSQL_3 += ' (' + ord + ',"' + medic + '","' + nbBoite + '","' + duree + '")';
        

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
        }   
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


