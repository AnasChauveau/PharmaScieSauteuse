// création du routeur Express pour ce module
const express = require('express')
let app = express()
const routeur = express.Router()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
const PharmaControlePatient = require('../controllers/pharmaControllerPatient')
const PharmaControleStock = require('../controllers/pharmaControllerStock')


routeur.get('/', PharmaControlePatient.pharMenu)

    // ------------------------ Patients ---------------------------- //

    .get('/Gestion-de-Patient', PharmaControlePatient.pharmAffichagePatients)

    .get('/Gestion-de-Patient/search', PharmaControlePatient.pharmaRecherchePatient)

    .get('/Gestion-de-Patient/info/:id', PharmaControlePatient.pharmInfoPatient)

    .get('/Gestion-de-Patient/newOrdonnance/:id', PharmaControlePatient.pharmulaireOrdonnance)

    .get('/Gestion-de-Patient/Update/:id', PharmaControlePatient.pharmulaireModifPatient)

    .get('/Gestion-de-Patient/delete/:id', PharmaControlePatient.pharmaDeletePatient)

    .get('/Formulaire', PharmaControlePatient.pharmulairePatient)

    .post('/Patient/Confirmation', PharmaControlePatient.pharmAjoutDePatient)

    .post('/Ordonnance/Confirmation/:id', PharmaControlePatient.pharmAjoutOrdonnance)

    .post('/Modif-Patient/Confirmation/:id', PharmaControlePatient.pharModifPatient)


    // ------------------------ Stocks ----------------------------- //

    .get('/Gestion-de-Stock', PharmaControleStock.pharmAffichageStocks)

    .get('/Gestion-de-Stock/search', PharmaControleStock.pharmaRechercheStocks)

    .get('/Gestion-de-Stock/Graphe/:id', PharmaControleStock.Chart)

    .get('/Gestion-de-Stock/Update/:id', PharmaControleStock.pharmulaireModifStock)

    .get('/Gestion-de-Stock/delete/:id', PharmaControleStock.pharmaDeleteMedic)

    .post('/Stock/Confirmation/:id', PharmaControleStock.pharModifStock)


module.exports = routeur