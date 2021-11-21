const db = require('../models/donnees')
const moment = require ("../config/moment")


const pharMenu = (req, res) => {
    res.render('menu')
}

const pharmAffichagePatients = (req, res) => {
    let couleur = 1;
    db.getPatient( (data) =>{
        res.render('patient', {patients : data, moment : moment, c : couleur})
    })
}

const pharmAffichageStocks = (req, res) => {
    let couleur = 1;
    db.getStock( (data) =>{
        res.render('stock', {medicaments : data, c : couleur})
    })
}

const pharmInfoPatient = (req, res) => {
    let noSS = req.params.id;
    let no = 1;
    
    // Conteneur du résultats des Requetes //
    let patient = "";
    let pathologie = "";
    let medicament = "";
    let mutuelle = "";

    db.getOnePatient(noSS, (data) =>{patient = data})
    db.getPathPatient(noSS, (data) =>{pathologie = data})
    //db.getOnePatient(noSS, (data) =>{patient = data})
    db.getMutuellePatient(noSS, (data) =>{mutuelle = data})
    setTimeout(() => {console.log(pathologie, mutuelle)
        res.render("fichePatient", {moment : moment, no : no, patient : patient, pathologie : pathologie, mutuelle :mutuelle})}, 200)
}

const pharmulaireOrdonnance = (req, res) => {
    // Conteneur du résultats des Requetes //
    let lesMedics = "";
    let lesMedecins = "";
    let lesPathologies = "";

    db.getStock((data) => {lesMedics = data;})
    db.getMedecin((data) => {lesMedecins = data;})
    db.getPathologie((data) => {lesPathologies = data;})
    setTimeout(() => {res.render('formOrdonnance', {medicaments : lesMedics, medecins : lesMedecins, pathologies : lesPathologies})}, 200)
}

const pharmulairePatient = (req, res) => {

    // Conteneur du résultats des Requetes //
    let lesMedics = "";
    let lesMedecins = "";
    let lesAssurances = "";
    let lesPathologies = "";

    db.getStock((data) => {lesMedics = data;})
    db.getMedecin((data) => {lesMedecins = data;})
    db.getMutuelle((data) => {lesAssurances = data;})
    db.getPathologie((data) => {lesPathologies = data;})
    setTimeout(() => {res.render('formPat', {moment : moment, medicaments : lesMedics, medecins : lesMedecins, assurances : lesAssurances, pathologies : lesPathologies})}, 200)
}

const pharmAjoutDePatient = (req, res) => {

    console.log(req.body);

    // Patient //
    let nomPatient = req.body.nom;
    let prenomPatient = req.body.prenom;
    let dateNaissance = req.body.date_naissance;
    let noSS = req.body.noSS;

    // Ordonnance //
    let path = req.body.pathologie;
    let medecin = req.body.medecin;
    let ordonnance = "";

    // Traitement //
    let medic = req.body.traitement;
    let Qte = req.body.Qte;
    let duree = req.body.duree;
    let nb_traitement = req.body.nb_traitement;
    
    // Assurance //
    let assur = req.body.mutuelle;
    let date_scan = req.body.date_scan;

    if (nomPatient == "" || prenomPatient == "" || dateNaissance == "" || noSS == "" ||
    path == "" || medecin == "" || medic == "" || Qte == ""){
        alert("Veuillez remplir tous les champs obligatoires !")
    }else{
        // Requete Patient //
        let requeteSQL_1 = "INSERT INTO patient (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES";
        requeteSQL_1 += ' (' + noSS + ',"' + nomPatient + '","' + prenomPatient + '","' + dateNaissance + '")';
        
        // Requete Ordonnance //
        let requeteSQL_2 = "INSERT INTO ordonnance (no_SS, Id_Path, Id_Mede) VALUES";
        requeteSQL_2 += ' (' + noSS + ',' + path + ',' + medecin + ')';
        
        let requetesSQL = [requeteSQL_1, requeteSQL_2];

        for (let t = 0;t < requetesSQL.length;t++) {
            db.query( requetesSQL[t], (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");
                } else {
                    console.log("Erreur lors de l'enregistrment de "+requetesSQL[t])
                    res.send("Erreur ajout : "+JSON.stringify(err))
                }
            })
        }   
        let requeteOrdonnance = "SELECT noOrd FROM ordonnance WHERE Id_Path = "+path+" AND Id_Mede = "+medecin+" and no_SS = "+noSS;
        db.query( requeteOrdonnance, (err, lignes, champs) => {
            ordonnance = lignes;
        })

        // Requete Traitement //
        setTimeout(() => {console.log(ordonnance);
            let requeteSQL_3 = 'INSERT INTO traitement (Id_Ord, Id_Medic, Nb_Boite, DureeEnMois) VALUES (' + ordonnance[0].noOrd + ',' + medic + ',' + Qte + ',' + duree + ')';
            let requeteQteNec = "";
            let QteTotal = 0;
            db.query( requeteSQL_3, (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");

                    QteTotal = Qte*duree;
                    requeteQteNec = "UPDATE medicament SET Qte_Necessaire = Qte_Necessaire + "+ QteTotal +" WHERE idMedic = "+ medic;
                    db.query( requeteQteNec, (err, lignes, champs) => {
                        if (!err) {
                            console.log("Insertion du patient terminé");
                        } else {
                            console.log("Erreur lors de l'enregistrment de "+requeteQteNec)
                            res.send("Erreur ajout : "+JSON.stringify(err))
                        }
                    })
                    
                } else {
                    console.log("Erreur lors de l'enregistrment de "+requeteSQL_3)
                    res.send("Erreur ajout : "+JSON.stringify(err))
                }
            })

            let traitementX = "";
            let QteX = "";
            let dureeX = "";
            if(nb_traitement != ''){  
                for(let i = 1;i<nb_traitement;i++){

                    traitementX = 'req.body.traitement'+i ;
                    QteX = 'req.body.Qte'+i ;
                    dureeX = 'req.body.duree'+i ;

                    requeteSQL_3 = 'INSERT INTO traitement (Id_Ord, Id_Medic, Nb_Boite, DureeEnMois) VALUES (' + ordonnance[0].noOrd + ',' + eval(traitementX) + ',' + eval(QteX) + ',' + eval(dureeX) + ')';
                    db.query( requeteSQL_3, (err, lignes, champs) => {
                        if (!err) {
                            console.log("Insertion du patient terminé");

                        } else {
                            console.log("Erreur lors de l'enregistrment de "+requeteSQL_3)
                            res.send("Erreur ajout : "+JSON.stringify(err))
                        }
                    })
                    
                    QteTotal = eval(QteX)*eval(dureeX);
                    requeteQteNec = "UPDATE medicament SET Qte_Necessaire = Qte_Necessaire + "+ QteTotal +" WHERE idMedic = "+ eval(traitementX);
                    db.query( requeteQteNec, (err, lignes, champs) => {
                        if (!err) {
                            console.log("Insertion du patient terminé");
                        } else {
                            console.log("Erreur lors de l'enregistrment de "+requeteQteNec)
                            res.send("Erreur ajout : "+JSON.stringify(err))
                        }
                    })
                }
            }
        }, 200)

        if (assur != 0){
            let requeteSQL_4 = "INSERT INTO echeance (no_SS, no_Assur, Date_Scan) VALUES";
            requeteSQL_4 += ' (' + noSS + ',' + assur + ',"' + date_scan + '")';
            db.query( requeteSQL_4, (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");
                } else {
                    console.log("Erreur lors de l'enregistrment de "+requeteSQL_4)
                    res.send("Erreur ajout : "+JSON.stringify(err))
                }
            })
        }
        res.render('confirm')
    }
}

const Chart = (req, res) => {
    res.render("chart")
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks,
    pharmulairePatient,
    pharmAjoutDePatient,
    pharmInfoPatient,
    pharmulaireOrdonnance,
    Chart
}




