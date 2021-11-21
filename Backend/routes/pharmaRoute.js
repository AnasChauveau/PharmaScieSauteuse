// création du routeur Express pour ce module
const express = require('express')
let app = express()
const routeur = express.Router()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))
const PharmaControle = require('../controllers/PharmaController')


routeur.get('/', PharmaControle.pharMenu)

    .get('/Gestion-de-Patient', PharmaControle.pharmAffichagePatients)

    .get('/Gestion-de-Patient/info/:id', PharmaControle.pharmInfoPatient)

    .get('/Gestion-de-Patient/Update/:id', PharmaControle.pharmulaireModifPatient)

    .get('/Gestion-de-Patient/newOrdonnance/:id', PharmaControle.pharmulaireOrdonnance)

    .get('/Gestion-de-Stock', PharmaControle.pharmAffichageStocks)

    .get('/Formulaire', PharmaControle.pharmulairePatient)

    .post('/Confirmation', PharmaControle.pharmAjoutDePatient)

    .get('/Gestion-de-Stock/Graphe:id', PharmaControle.Chart)

module.exports = routeur