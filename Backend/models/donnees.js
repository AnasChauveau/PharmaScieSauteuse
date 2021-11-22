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

const getOneMedic = async (Myid) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM medicament WHERE idMedic = ?";
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

const getPathologiePatient = async (noSS) => {
    return new Promise((resolve, reject) => {
        let sql="SELECT Id_Path FROM ordonnance WHERE no_SS = ?";
        db.query(sql, noSS,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
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

const updateMedic = async (nom, QteStock, Qte_Necessaire, IDmedic) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE medicament SET Nom_Medic = ?, Qte_En_Stock = ?, Qte_Necessaire = ? WHERE idMedic = ?";
        db.query(sql, [nom, QteStock, Qte_Necessaire, IDmedic],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const updateNoSSOrd = async (newNoSS, noSS) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE ordonnance SET no_SS = ? WHERE no_SS = ?";
        db.query(sql, [newNoSS, noSS],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}


const updateNoSSAssur = async (newNoSS, noSS) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE echeance SET no_SS = ? WHERE no_SS = ?";
        db.query(sql, [newNoSS, noSS],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}


const updateNoSSPatient = async (newNoSS, noSS) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE patient SET noSS = ? WHERE noSS = ?";
        db.query(sql, [newNoSS, noSS],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}


const updatePatient = async (newNom, newPrenom, newDate_Naissance, noSS) => {
    return new Promise((resolve, reject) => {
        let sql="UPDATE patient SET Nom_Patient = ?, Prenom_Patient = ?, Date_Naissance = ? WHERE noSS = ?";
        db.query(sql, [newNom, newPrenom, newDate_Naissance, noSS],(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const deleteOrdPatient = async (noSS) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM ordonnance WHERE no_SS = ?";
        db.query(sql, noSS,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}


const deleteAssurPatient = async (noSS) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM echeance WHERE no_SS = ?";
        db.query(sql, noSS,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const deletePatient = async (noSS) => {
    return new Promise((resolve, reject) => {
        let sql="DELETE FROM patient WHERE noSS = ?";
        db.query(sql, noSS,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const deleteTraitement = async (id) => {
    return new Promise((resolve, reject) => {
        let sql="Delete FROM traitement WHERE Id_Medic = ?";
        db.query(sql, id,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}

const deleteMedic = async (id) => {
    return new Promise((resolve, reject) => {
        let sql="Delete FROM medicament WHERE idMedic = ?";
        db.query(sql, id,(err, data, fields) => {
            if (err) throw err;
            return resolve(data);
        })
    })
}


module.exports={
    getPatient,
    getOnePatient,
    getOneMedic,
    getPathPatient,
    getMedicPatient,
    getMutuellePatient,
    getStock,
    getMedecin,
    getMutuelle,
    getPathologie,
    getOrdonnancePatient,
    getPathologiePatient,
    newOrdonnance,
    newPatient,
    newTraitement,
    newAssurance,
    updateQteNec,
    updateMedic,
    updateNoSSAssur,
    updateNoSSOrd,
    updateNoSSPatient,
    updatePatient,
    deleteAssurPatient,
    deleteOrdPatient,
    deletePatient,
    deleteTraitement,
    deleteMedic,
}