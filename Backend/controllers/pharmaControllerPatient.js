const db = require('../models/donnees') // Requetes 
const moment = require ("../config/moment") // format de date fr 

// Affichage Menu //
const pharMenu = (req, res) => {
    res.render('menu')
}

// Affichage de tous les Patients //
const pharmAffichagePatients = async (req, res) => {
    let couleur = 0;
    await db.getPatient()
    .then((data) => {
        let err = false;
        res.render('patient', {patients : data, moment : moment, c : couleur, erreur : err})
    }).catch((err) => {
        res.render('patient', {erreur : err})
    })
}

// Recherche de Patients en particulier //
const pharmaRecherchePatient = async (req, res) => {
    let couleur = 0;
    let mot = req.param('searchPat'); // Les autres solution n'étaient pas fonctionnelles
    mot = "%"+mot+"%";
    let data = await db.searchPatient(mot,mot,mot)

    res.render('patient', {patients : data, moment : moment, c : couleur})
}

// Affichage fiche Patient //
const pharmInfoPatient = async (req, res) => {
    let noSS = req.params.id;
    let no = 1;
    
    // Conteneur du résultats des Requetes //
    let patient = await db.getOnePatient(noSS);
    let pathologie = await db.getPathPatient(noSS);
    let medicament = await db.getMedicPatient(noSS);
    let mutuelle = await db.getMutuellePatient(noSS);
    
    res.render("fichePatient", {moment : moment, no : no, patient : patient, pathologie : pathologie, mutuelle : mutuelle, medicament : medicament, noSS : noSS})
}

// Affichage formulaire de modif Patient //
const pharmulaireModifPatient = async (req, res) => {
    let noSS = req.params.id;

    // Conteneur du résultats des Requetes //
    let patient = await db.getOnePatient(noSS);

    res.render('formModifPatient', {moment : moment, patient : patient})
}

// Lancement de la modif Patient //
const pharModifPatient = async (req, res) => {
    let noSS = req.params.id;

    let newNom = req.body.newNom;
    let newPrenom = req.body.newPrenom;
    let newNoSS = req.body.newNoSS;
    let newDate_Naissance = req.body.newDate_Naissance;

    if (newNom.length < 3 || newPrenom.length < 3 || newDate_Naissance == "" || newNoSS.length < 15 || newNoSS.length > 15){
        // MESSAGE D'ERREUR //
        let url = "/pharmaScieSauteuse/Gestion-de-Patient/Update/"+noSS;
        res.render('errChamps', {url : url})
    }else{
            // PAS DE MESSAGE D'ERREUR //

        await db.updatePatient(newNom, newPrenom, newDate_Naissance, noSS)

        if (noSS != newNoSS) { // Si le noSS(clé primaire) est modifié, alors on l'a modifie de partout pour ne pas faire d'orphelin
            await db.updateNoSSAssur(newNoSS, noSS)
            await db.updateNoSSOrd(newNoSS, noSS)
            await db.updateNoSSPatient(newNoSS, noSS)
        }
        res.render("confirmPatient")
    }
}

// Affichage du formulaire d'ajout Ordonnance //
const pharmulaireOrdonnance = async (req, res) => {
    let noSS = req.params.id;

    // Conteneur du résultats des Requetes //
    let lesMedics = await db.getStock();
    let lesMedecins = await db.getMedecin();
    let lesPathologies = await db.getPathologie();

    res.render('formOrdonnance', {medicaments : lesMedics, medecins : lesMedecins, pathologies : lesPathologies, noSS : noSS})
}

// Lancement de l'ajout Ordonnance //
const pharmAjoutOrdonnance = async (req, res) => {
    // Patient //
    let noSS = req.params.id;
    
    // Ordonnance //
    let patho = await db.getPathologiePatient(noSS); // récupération des pathologies du patient
    let newPath = req.body.pathologie;
    let medecin = req.body.medecin;
    
    // Traitement //
    let traitement = req.body.traitement;
    let Qte = req.body.Qte
    let duree = req.body.duree
    let nb_traitement = req.body.nb_traitement;

    var pass = "OK";

    if (newPath == 0 || medecin == 0 || traitement == 0 || Qte < 1 || duree < 1 || Qte > 20 || duree > 12){
        pass = "Pas OK"
    }

    if(pass == "OK"){    
        // Requete Insert : Ordonnance //
        patho.forEach(function(path){

        if(path.Id_Path === parseInt(newPath)){
            pass = "Pas OK"
        }
    })
        await db.newOrdonnance(noSS, newPath, medecin);
        console.log("Ajout Ordonnance : Sucess ");
    
        let Ordonnance = await db.getOneOrdonnancePatient(newPath, medecin, noSS);
        let noOrd = Ordonnance.noOrd;

        // Requete Insert : Traitement //
        await db.newTraitement(noOrd, traitement, Qte, duree);
    
        // Requete Update : Qté Nécessaire //
        let QteTotal = Qte*duree;
        await db.updateQteNec(QteTotal, traitement);
    
        // Requete Insert : Traitements (Si plusieurs traitement) //
        if (nb_traitement > 1){
            let traitementX = "";
            let QteX = "";
            let dureeX = "";
            let QteTotalX = 0;
            for(let i = 1;i<nb_traitement;i++){        
                traitementX = 'req.body.traitement'+i ;
                QteX = 'req.body.Qte'+i ;
                dureeX = 'req.body.duree'+i ;
                if (eval(traitementX) == "" || eval(QteX) < 1 || eval(dureeX) < 1 || eval(QteX) > 20 || eval(dureeX) > 12){
                    // MESSAGE D'ERREUR //
                    let url = "/pharmaScieSauteuse/Gestion-de-Patient/newOrdonnance/"+noSS;
                    res.render('errChamps', {url : url})
                }else{
                    await db.newTraitement(noOrd, eval(traitementX), eval(QteX), eval(dureeX));
                    // Requete Update : Qtés Nécessaires //
                    QteTotalX = eval(QteX)*eval(dureeX)
                    await db.updateQteNec(QteTotalX, eval(traitementX));
                }
            }
            console.log("Ajout Des Traitements : Sucess ");
        } else{
            console.log("Ajout Du Traitement : Sucess ");
        }
        res.render('confirmPatient')
    }else{
        let url = "/pharmaScieSauteuse/Gestion-de-Patient/newOrdonnance/"+noSS;
        res.render('errChamps', {url : url})
    }
}

// Suppresion du Patient //
const pharmaDeletePatient = async (req, res) => {
    let noSS = req.params.id;

    await db.deleteAssurPatient(noSS); // Suppresion du lien Assurance/Patient
    let Ordonnance = await db.getOrdonnancePatient(noSS); // Récupération

    for (let i = 0;i<Ordonnance.length;i++){
       await db.deleteTraitementPatient(Ordonnance[i].noOrd); // Suppression des traitement du Patient
    }
    await db.deleteOrdPatient(noSS); // Suppression des ordonnances du Patient
    await db.deletePatient(noSS); // Suppression du Patient

    res.render("confirmPatient")
}

// Affichage Formulaire d'ajout Patient //
const pharmulairePatient = async (req, res) => {

    // Conteneur du résultats des Requetes //
    let lesMedics = await db.getStock();
    let lesMedecins = await db.getMedecin();
    let lesAssurances = await db.getMutuelle();
    let lesPathologies = await db.getPathologie();

    res.render('formPat', {moment : moment, medicaments : lesMedics, medecins : lesMedecins, assurances : lesAssurances, pathologies : lesPathologies})
}

// Lancement de l'ajout de Patient //
const pharmAjoutDePatient = async (req, res) => {

    // Patient //
    let nomPatient = req.body.nom;
    let prenomPatient = req.body.prenom;
    let dateNaissance = req.body.date_naissance;
    let noSS = req.body.noSS;

    // Ordonnance //
    let path = req.body.pathologie;
    let medecin = req.body.medecin;

    // Traitement //
    let traitement = req.body.traitement;
    let Qte = req.body.Qte
    let duree = req.body.duree
    let nb_traitement = req.body.nb_traitement;
    
    // Assurance //
    let assur = req.body.mutuelle;
    let date_scan = req.body.date_scan;
    if (nomPatient.length < 3 || prenomPatient.length < 3 || dateNaissance == "" || noSS.length < 15 || noSS.length > 15 ||
        path == 0 || medecin == 0 || traitement == 0 || Qte < 1 || duree < 1 || Qte > 20 || duree > 12){
        // MESSAGE D'ERREUR //
        let url = "/PharmaScieSauteuse/Formulaire";
        res.render('errChamps', {url : url})
    }else{
            // PAS DE MESSAGE D'ERREUR //

        // Requete Insert : Patient, Ordonnance //
        await db.newPatient(noSS, nomPatient, prenomPatient, dateNaissance);
        console.log("Ajout Patient : Sucess ");

        await db.newOrdonnance(noSS, path, medecin);
        console.log("Ajout Ordonnance : Sucess ");
        
        let Ordonnance = await db.getOneOrdonnancePatient(path, medecin, noSS);
        let noOrd = Ordonnance.noOrd;

        // Requete Insert : Traitement //
        await db.newTraitement(noOrd, traitement, Qte, duree); // Ajout du premier traitement
        
        // Requete Update : Qté Nécessaire //
        let QteTotal = Qte*duree;
        await db.updateQteNec(QteTotal, traitement);
        
        // Requete Insert : Traitements (Si plusieurs traitement) //
        if (nb_traitement > 1){
            let traitementX = "";
            let QteX = "";
            let dureeX = "";
            let QteTotalX = 0;
            // Ajout des autres traitements, si ils sont selectionnés //
            for(let i = 1;i<nb_traitement;i++){        
                traitementX = 'req.body.traitement'+i ;
                QteX = 'req.body.Qte'+i ;
                dureeX = 'req.body.duree'+i ;
                if (eval(traitementX) == "" || eval(QteX) < 1 || eval(dureeX) < 1 || eval(QteX) > 20 || eval(dureeX) > 12){
                    // MESSAGE D'ERREUR //
                    let url = "/PharmaScieSauteuse/Formulaire";
                    res.render('errChamps', {url : url})
                }else{
                await db.newTraitement(noOrd, eval(traitementX), eval(QteX), eval(dureeX));
                // Requete Update : Qtés Nécessaires //
                QteTotalX = eval(QteX)*eval(dureeX)
                await db.updateQteNec(QteTotalX, eval(traitementX));
                }
            }
            console.log("Ajout Des Traitements : Sucess ");
        } else{
            console.log("Ajout Du Traitement : Sucess ");
        }

        // Ajout d'une assurance, si elle est selectionné //
        if (assur != 0){
            await db.newAssurance(noSS , assur, date_scan);
        }
        res.render('confirmPatient')
    }
}

// Exportation //
module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmulairePatient,
    pharmAjoutDePatient,
    pharmAjoutOrdonnance,
    pharmaRecherchePatient,
    pharmInfoPatient,
    pharmulaireOrdonnance,
    pharmulaireModifPatient,
    pharModifPatient,
    pharmaDeletePatient,
}




