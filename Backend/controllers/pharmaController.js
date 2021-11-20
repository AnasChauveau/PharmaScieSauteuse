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

const pharmAffichageStocks = (req, res) => {
    res.render('stock')
}

const pharmulairePatient = (req, res) => {
    let leMoment = moment;

    // Préparations des Requetes //
    let requeteMedic = "SELECT * FROM medicament" ;
    let requeteMedec = "SELECT * FROM medecin" ;
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
            mysqlconnexion.query( requetesSQL[t], (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");
                } else {
                    console.log("Erreur lors de l'enregistrment de "+requetesSQL[t])
                    res.send("Erreur ajout : "+JSON.stringify(err))
                }
            })
        }   
        let requeteOrdonnance = "SELECT noOrd FROM ordonnance WHERE Id_Path = "+path+" AND Id_Mede = "+medecin+" and no_SS = "+noSS;
        mysqlconnexion.query( requeteOrdonnance, (err, lignes, champs) => {
            ordonnance = lignes;
        })

        // Requete Traitement //
        setTimeout(() => {console.log(ordonnance);
            let requeteSQL_3 = 'INSERT INTO traitement (Id_Ord, Id_Medic, Nb_Boite, DureeEnMois) VALUES (' + ordonnance[0].noOrd + ',' + medic + ',' + Qte + ',' + duree + ')';
            let requeteQteNec = "";
            let QteTotal = 0;
            mysqlconnexion.query( requeteSQL_3, (err, lignes, champs) => {
                if (!err) {
                    console.log("Insertion du patient terminé");

                    QteTotal = Qte*duree;
                    requeteQteNec = "UPDATE medicament SET Qte_Necessaire = Qte_Necessaire + "+ QteTotal +" WHERE idMedic = "+ medic;
                    mysqlconnexion.query( requeteQteNec, (err, lignes, champs) => {
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
                    mysqlconnexion.query( requeteSQL_3, (err, lignes, champs) => {
                        if (!err) {
                            console.log("Insertion du patient terminé");

                        } else {
                            console.log("Erreur lors de l'enregistrment de "+requeteSQL_3)
                            res.send("Erreur ajout : "+JSON.stringify(err))
                        }
                    })
                    
                    QteTotal = eval(QteX)*eval(dureeX);
                    requeteQteNec = "UPDATE medicament SET Qte_Necessaire = Qte_Necessaire + "+ QteTotal +" WHERE idMedic = "+ eval(traitementX);
                    mysqlconnexion.query( requeteQteNec, (err, lignes, champs) => {
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
            mysqlconnexion.query( requeteSQL_4, (err, lignes, champs) => {
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

const pharmInfoPatient = (req, res) => {
    res.render("fichePatient")
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
    Chart
}


