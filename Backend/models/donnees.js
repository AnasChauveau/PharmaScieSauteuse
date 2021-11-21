const db = require('../models/connexion')

// SELECT //
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

const getOrdonnancePatient = async (IDpath, IDmedecin, noSS) => {
    return new Promise((resolve, reject) => {
        let sql="SELECT noOrd FROM ordonnance WHERE Id_Path = ? AND Id_Mede = ? and no_SS = ?";
        db.query(sql, [IDpath, IDmedecin, noSS],(err, data, fields) => {
            if (err) throw err;
            return resolve(data[0]);
        })
    })
}
//

// INSERT //
const newOrdonnance = async (noSS, IDpath, IDmede) => {
    return new Promise((resolve, reject) => {
        let sql='INSERT INTO ordonnance (no_SS, Id_Path, Id_Mede) VALUES (?, ?, ?)';
        db.query(sql, [noSS, IDpath, IDmede],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const newPatient = async (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) => {
    return new Promise((resolve, reject) => {
        let sql='INSERT INTO patient (noSS, Nom_Patient, Prenom_Patient, Date_Naissance) VALUES (?, ?, ?, ?)';
        db.query(sql, [noSS, Nom_Patient, Prenom_Patient, Date_Naissance],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const newTraitement = async (IDord, IDmedic, NBboites, Duree) => {
    return new Promise((resolve, reject) => {
        let sql='INSERT INTO traitement (Id_Ord, Id_Medic, Nb_Boite, DureeEnMois) VALUES (?, ?, ?, ?)';
        db.query(sql, [IDord, IDmedic, NBboites, Duree],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const newAssurance = async (noSS, noAssur, DateScan) => {
    return new Promise((resolve, reject) => {
        let sql="INSERT INTO echeance (no_SS, no_Assur, Date_Scan) VALUES (?, ?, ?)";
        db.query(sql, [noSS, noAssur, DateScan],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const updateQteNec = async (Qte, IDmedic) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE medicament SET Qte_Necessaire = Qte_Necessaire + ? WHERE idMedic = ?";
        db.query(sql, [Qte, IDmedic],(err, data, fields) => {
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
    getPathologie,
    getOrdonnancePatient,
    newOrdonnance,
    newPatient,
    newTraitement,
    newAssurance,
    updateQteNec,
}