const pharMenu = (req, res) => {
    res.render('menu')
}

const pharmAffichagePatients = (req, res) => {
    let requete = "SELECT CONCAT(Nom_Patient, ' ', Prenom_Patient) AS Nom_Patient FROM patient"
    mysqlconnexion.query(requete, (err, lignes, champs) => {
        if (!err) {
            console.log(lignes)
            res.render('patient', {patients : lignes})
        }else{
            res.redirect('erreur')
        }
    })
}

function pharmAffichageStocks(req, res) {
    res.render('stock')
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks
}