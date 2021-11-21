const db = require('../models/connexion')

const getPatient = async () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT CONCAT(Nom_Patient, ' ', Prenom_Patient) AS Nom_Patient, noSS, Date_naissance FROM patient order by Nom_Patient, Prenom_Patient, noSS";
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            return resolve(data)
        })
    })
}

const getStock = async () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM medicament order by Nom_Medic, idMedic";
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const getOnePatient = async (Myid) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM patient WHERE noSS = ?";
        db.query(sql, Myid,(err, data, fields) => {
            if (err) throw err;
            return resolve(data[0]);
        })
    })
}

const getPathPatient = async (Myid) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT Nom_Path FROM ordonnance, pathologie WHERE idPath = Id_Path and no_SS = ?";
        db.query(sql, Myid,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const getMedicPatient = async (Myid) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT Nom_Medic, nb_Boite, DureeEnMois FROM ordonnance, traitement, medicament WHERE noOrd = Id_Ord and idMedic = Id_Medic and no_SS = ?";
        db.query(sql, Myid,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const getMutuellePatient = async (Myid) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT Nom_Assur, noAssur FROM echeance, assurance WHERE noAssur = no_Assur and no_SS = ?";
        db.query(sql, Myid,(err, data, fields) => {
            if (err) throw err;
            return resolve(data[0]);
        })
    })
} 



const getMedecin = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT * FROM medecin';
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const getMutuelle = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT * FROM assurance order by Nom_Assur';
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const getPathologie = async () => {
    return new Promise((resolve, reject) => {
        let sql='SELECT * FROM pathologie order by Nom_Path';
        db.query(sql, (err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

module.exports={
    getPatient,
    getOnePatient,
    getPathPatient,
    getMedicPatient,
    getMutuellePatient,
    getStock,
    getMedecin,
    getMutuelle,
    getPathologie
}