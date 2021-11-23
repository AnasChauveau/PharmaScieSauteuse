const db = require('../models/donnees')
const moment = require ("../config/moment")

// Affichage de tous les tocks //
const pharmAffichageStocks = async (req, res) => {
    let couleur = 0;
    let data = await db.getStock() // Obtenir les stocks de medicament
    res.render('stock', {medicaments : data, c : couleur})
}

// Recherche de Stocks en particulier //
const pharmaRechercheStocks = async (req, res) => {
    let couleur = 0;
    let mot = req.param('searchStock'); // Les autres solution n'étaient pas fonctionnelles
    mot = "%"+mot+"%";
    let data = await db.searchStock(mot, mot) // Fait la recherche par Ref ou par Nom du medicament
    
    res.render('stock', {medicaments : data, c : couleur})
}

// Affichage formulaire de modif Stock //
const pharmulaireModifStock = async (req, res) => {
    let idMedic = req.params.id;
    let medicament = await db.getOneMedic(idMedic); // Obtenir les infos du medicament

    res.render("formModifStock", {idMedic : idMedic, medicament : medicament})
}

// Lancement de la modif Stock //
const pharModifStock = async (req, res) => {
    let idMedic = req.params.id;

    // Récupération des valeurs de la page //
    let newNom = req.body.newNom;
    let newStock = req.body.newStock;
    let newNecess = req.body.newNecess;

    if (newNom.length < 2 ||  newStock < 1 || newStock > 20 || newNecess < 1 ){
        // MESSAGE D'ERREUR //
        let erreur = "Veuillez remplir correctement les champs !"
        res.redirect("/pharmaScieSauteuse/Gestion-de-Stock/Update/"+idMedic)
    }

    await db.updateMedic(newNom, newStock, newNecess, idMedic); // Modification du medicament

    res.render('confirmStock')
}

// Affichage Graphique de la Quantité nécessaire du medicament //
const Chart = async (req, res) => {
    let idMedic = req.params.id;

    let Medic = await db.getOneMedic(idMedic) // Obtenir 1 medicament
    let traitement = await db.getTraitement(idMedic); // Obtenir les traitements de ce medicament

    // Tableau 12 places pour les 12 mois
    var nbBoiteMois = [0,0,0,0,0,0,0,0,0,0,0,0];

    // Boucle qui additionne tous les Qte Neccessaire du medicament, en fonction du nb de mois 
    for(let y = 0;y<traitement.length;y++){
        for(let i = 0;i<traitement[y].DureeEnMois;i++){
            nbBoiteMois[i] += traitement[y].Nb_Boite
        }
    }

    res.render("chart", {moment : moment, nb : nbBoiteMois, medic : Medic})
}

// Suppression du medicament //
const pharmaDeleteMedic = async (req, res) => {
    let idMedic = req.params.id;

    await db.deleteMedic(idMedic); // Suppression du medicament
    await db.deleteTraitement(idMedic); // Suppression des traitements de ce medicament

    res.render("confirmStock")
}

// Exportation //
module.exports = {
    pharmAffichageStocks,
    pharmaRechercheStocks,
    pharmulaireModifStock,
    pharModifStock,
    pharmaDeleteMedic,
    Chart,
}