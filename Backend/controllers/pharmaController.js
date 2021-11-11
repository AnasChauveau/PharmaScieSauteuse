const pharMenu = (req, res) => {
    res.render('menu')
}

const pharmAffichagePatients = (req, res) => {
    res.render('patient')
}

const pharmAffichageStocks = (req, res) => {
    res.render('stock')
}

module.exports = {
    pharMenu,
    pharmAffichagePatients,
    pharmAffichageStocks
}