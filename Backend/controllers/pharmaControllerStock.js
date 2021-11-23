const db = require('../models/donnees')
const moment = require ("../config/moment")

const pharmAffichageStocks = async (req, res) => {
    let couleur = 0;
    let data = await db.getStock()
    res.render('stock', {medicaments : data, c : couleur})
}

const pharmaRechercheStocks = async (req, res) => {
    let couleur = 0;
    let mot = req.param('searchStock'); // Les autres solution n'étaient pas fonctionnelles
    mot = "%"+mot+"%";
    let data = await db.searchStock(mot, mot)
    
    res.render('stock', {medicaments : data, c : couleur})
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

    if (newNom.length < 2 ||  newStock < 1 || newStock > 20 || newNecess < 1 ){
        // MESSAGE D'ERREUR //
        let erreur = "Veuillez remplir correctement les champs !"
        res.redirect("/pharmaScieSauteuse/Gestion-de-Stock/Update/"+idMedic)
    }

    await db.updateMedic(newNom, newStock, newNecess, idMedic);

    res.render('confirmStock')
}

const Chart = async (req, res) => {
    let idMedic = req.params.id;

    let Medic = await db.getOneMedic(idMedic)
    let traitement = await db.getTraitement(idMedic);

    var nbBoiteMois = [0,0,0,0,0,0,0,0,0,0,0,0];

    for(let y = 0;y<traitement.length;y++){
        for(let i = 0;i<traitement[y].DureeEnMois;i++){
            nbBoiteMois[i] += traitement[y].Nb_Boite
        }
    }

    res.render("chart", {moment : moment, nb : nbBoiteMois, medic : Medic})
}

const pharmaDeleteMedic = async (req, res) => {
    let idMedic = req.params.id;

    await db.deleteMedic(idMedic);
    await db.deleteTraitement(idMedic); // Suppression des traitements de ce medicament

    res.render("confirmStock")
}


module.exports = {
    pharmAffichageStocks,
    pharmaRechercheStocks,
    pharmulaireModifStock,
    pharModifStock,
    pharmaDeleteMedic,
    Chart,
}