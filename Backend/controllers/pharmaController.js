const db = require('../models/donnees')
const moment = require ("../config/moment")


const pharMenu = (req, res) => {
    res.render('menu')
}


const pharmAffichagePatients = async (req, res) => {
    let couleur = 1;
    let data = await db.getPatient()
    res.render('patient', {patients : data, moment : moment, c : couleur})  
}


const pharmAffichageStocks = async (req, res) => {
    let couleur = 1;
    let data = await db.getStock()
    res.render('stock', {medicaments : data, c : couleur})
}


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

const pharmulairePatient = async (req, res) => {

    // Conteneur du résultats des Requetes //
    let lesMedics = await db.getStock();
    let lesMedecins = await db.getMedecin();
    let lesAssurances = await db.getMutuelle();
    let lesPathologies = await db.getPathologie();

    res.render('formPat', {moment : moment, medicaments : lesMedics, medecins : lesMedecins, assurances : lesAssurances, pathologies : lesPathologies})
}


const pharmulaireModifPatient = async (req, res) => {
    let noSS = req.params.id;

    // Conteneur du résultats des Requetes //
    let lesMedics = await db.getStock(noSS);
    let lesMedecins = await db.getMedecin(noSS);
    let lesAssurances = await db.getMutuelle();
    let lesPathologies = await db.getPathologie(noSS);

    res.render('formModifPatient', {moment : moment, medicaments : lesMedics, medecins : lesMedecins, pathologies : lesPathologies, assurances : lesAssurances})
}


const pharmulaireOrdonnance = async (req, res) => {
    let noSS = req.params.id;
    // Conteneur du résultats des Requetes //
    let lesMedics = await db.getStock();
    let lesMedecins = await db.getMedecin();
    let lesPathologies = await db.getPathologie();

    res.render('formOrdonnance', {medicaments : lesMedics, medecins : lesMedecins, pathologies : lesPathologies, noSS : noSS})
}

const pharmAjoutOrdonnance = async (req, res) => {
    // Patient //
    let noSS = req.params.id;
    
    // Ordonnance //
    let path = req.body.pathologie;
    let medecin = req.body.medecin;
    
    // Traitement //
    let traitement = req.body.traitement;
    let Qte = req.body.Qte
    let duree = req.body.duree
    let nb_traitement = req.body.nb_traitement;

    // Requete Insert : Ordonnance //
    await db.newOrdonnance(noSS, path, medecin);
    console.log("Ajout Ordonnance : Sucess ");
    
    let Ordonnance = await db.getOrdonnancePatient(path, medecin, noSS);
    let noOrd = Ordonnance.noOrd;

    // Requete Insert : Traitement //
    await db.newTraitement(noOrd, traitement, Qte, duree);
    
    // Requete Update : Qté Nécessaire //
    let QteTotal = Qte*duree;
    await db.updateQteNec(QteTotal, traitement);
    
    // Requete Insert : Traitements //
    if (nb_traitement > 1){
        let traitementX = "";
        let QteX = "";
        let dureeX = "";
        let QteTotalX = 0;
        for(let i = 1;i<nb_traitement;i++){        
            traitementX = 'req.body.traitement'+i ;
            QteX = 'req.body.Qte'+i ;
            dureeX = 'req.body.duree'+i ;
            await db.newTraitement(noOrd, eval(traitementX), eval(QteX), eval(dureeX));
            // Requete Update : Qtés Nécessaires //
            QteTotalX = eval(QteX)*eval(dureeX)
            await db.updateQteNec(QteTotalX, eval(traitementX));
        }
        console.log("Ajout Des Traitements : Sucess ");
    } else{
        console.log("Ajout Du Traitement : Sucess ");
    }
    res.render('confirm')
}

const pharmAjoutDePatient = async (req, res) => {

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
    let traitement = req.body.traitement;
    let Qte = req.body.Qte
    let duree = req.body.duree
    let nb_traitement = req.body.nb_traitement;
    
    // Assurance //
    let assur = req.body.mutuelle;
    let date_scan = req.body.date_scan;

    if (nomPatient == "" || prenomPatient == "" || dateNaissance == "" || noSS == "" ||
        path == "" || medecin == "" || traitement == "" || Qte == "" || duree == ""){
            // MESSAGE D'ERREUR //
    }else{
            // PAS DE MESSAGE D'ERREUR //

        // Requete Insert : Patient, Ordonnance //
        await db.newPatient(noSS, nomPatient, prenomPatient, dateNaissance);
        console.log("Ajout Patient : Sucess ");

        await db.newOrdonnance(noSS, path, medecin);
        console.log("Ajout Ordonnance : Sucess ");
        
        let Ordonnance = await db.getOrdonnancePatient(path, medecin, noSS);
        let noOrd = Ordonnance.noOrd;

        // Requete Insert : Traitement //
        await db.newTraitement(noOrd, traitement, Qte, duree);
        
        // Requete Update : Qté Nécessaire //
        let QteTotal = Qte*duree;
        await db.updateQteNec(QteTotal, traitement);
        
        // Requete Insert : Traitements //
        if (nb_traitement > 1){
            let traitementX = "";
            let QteX = "";
            let dureeX = "";
            let QteTotalX = 0;
            for(let i = 1;i<nb_traitement;i++){        
                traitementX = 'req.body.traitement'+i ;
                QteX = 'req.body.Qte'+i ;
                dureeX = 'req.body.duree'+i ;
                await db.newTraitement(noOrd, eval(traitementX), eval(QteX), eval(dureeX));
                // Requete Update : Qtés Nécessaires //
                QteTotalX = eval(QteX)*eval(dureeX)
                await db.updateQteNec(QteTotalX, eval(traitementX));
            }
            console.log("Ajout Des Traitements : Sucess ");
        } else{
            console.log("Ajout Du Traitement : Sucess ");
        }

        if (assur != 0){
            await db.newAssurance(noSS , assur, date_scan);    
        }
        res.render('confirm')
    }
}

const pharmulaireModifStock = async (req, res) => {
    let idMedic = req.params.id;
    let medicament = await db.getOneMedic(idMedic);

    res.render("formModifStock", {idMedic : idMedic, medicament : medicament})
}

const pharModifStock = async (req, res) => {
    let idMedic = req.params.id;

    let newNom = req.body.newNom;
    let newStock = req.body.newStock;
    let newNecess = req.body.newNecess;

    await db.updateMedic(newNom, newStock, newNecess, idMedic);

    res.render('confirm')
}

const Chart = async (req, res) => {
    res.render("chart")
}


module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks,
    pharmulairePatient,
    pharmAjoutDePatient,
    pharmAjoutOrdonnance,
    pharmInfoPatient,
    pharmulaireOrdonnance,
    pharmulaireModifPatient,
    pharmulaireModifStock,
    pharModifStock,
    Chart
}




