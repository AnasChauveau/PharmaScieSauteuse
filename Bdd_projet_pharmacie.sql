-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 22 nov. 2021 à 20:58
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_pharmacie`
--

-- --------------------------------------------------------

--
-- Structure de la table `assurance`
--

DROP TABLE IF EXISTS `assurance`;
CREATE TABLE IF NOT EXISTS `assurance` (
  `noAssur` bigint(15) NOT NULL,
  `Nom_Assur` varchar(30) NOT NULL,
  PRIMARY KEY (`noAssur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `assurance`
--

INSERT INTO `assurance` (`noAssur`, `Nom_Assur`) VALUES
(531426, 'Grumlot industrie'),
(12531426, 'Marmote industrie'),
(1248877, 'Mors Mutuelle'),
(12365, 'PharMutuelle'),
(5213, 'HamdoulillahTesVivant'),
(66365, 'CPA'),
(44323, 'MarabouAssurance'),
(33319, 'LaSIO Protection'),
(666, 'LaRouma Industie'),
(777, 'Soin A LaScieSauthez');

-- --------------------------------------------------------

--
-- Structure de la table `echeance`
--

DROP TABLE IF EXISTS `echeance`;
CREATE TABLE IF NOT EXISTS `echeance` (
  `no_SS` bigint(15) NOT NULL,
  `no_Assur` bigint(15) NOT NULL,
  `Date_Scan` date NOT NULL,
  PRIMARY KEY (`no_SS`,`no_Assur`),
  KEY `no_Pat` (`no_SS`,`no_Assur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `idMede` int(11) NOT NULL AUTO_INCREMENT,
  `NomCompletMede` varchar(55) NOT NULL,
  PRIMARY KEY (`idMede`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `medecin`
--

INSERT INTO `medecin` (`idMede`, `NomCompletMede`) VALUES
(1, 'Brayan COROBAL'),
(2, 'Mahmoud LeMarabou'),
(3, 'DAVID Louis'),
(4, 'CHAUVEAU Anas'),
(5, 'BENAISSA Ilian'),
(6, 'GUCLU Sefa'),
(7, 'SCIE Sauthez'),
(8, 'FRANCK Ribery');

-- --------------------------------------------------------

--
-- Structure de la table `medicament`
--

DROP TABLE IF EXISTS `medicament`;
CREATE TABLE IF NOT EXISTS `medicament` (
  `idMedic` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Medic` varchar(40) NOT NULL,
  `Qte_En_Stock` int(11) NOT NULL DEFAULT '0',
  `Qte_Necessaire` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idMedic`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `medicament`
--

INSERT INTO `medicament` (`idMedic`, `Nom_Medic`, `Qte_En_Stock`, `Qte_Necessaire`) VALUES
(1, 'Doliprane', 0, 6),
(15, 'Aranesp', 0, 0),
(9, 'Lucentis', 0, 0),
(4, 'Dafalgan', 0, 0),
(5, 'LevothyPEDUS', 0, 0),
(11, 'Crestor', 0, 0),
(13, 'Lantus', 0, 0),
(14, 'Glives', 0, 0),
(12, 'Enbrel', 0, 0),
(10, 'Eylea', 0, 0),
(8, 'Humira', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `noOrd` int(11) NOT NULL AUTO_INCREMENT,
  `no_SS` bigint(15) NOT NULL,
  `Id_Path` int(11) NOT NULL,
  `Id_Mede` int(11) NOT NULL,
  PRIMARY KEY (`noOrd`),
  KEY `Id_Patient` (`no_SS`),
  KEY `Id_Mede` (`Id_Mede`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `pathologie`
--

DROP TABLE IF EXISTS `pathologie`;
CREATE TABLE IF NOT EXISTS `pathologie` (
  `idPath` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Path` varchar(30) NOT NULL,
  PRIMARY KEY (`idPath`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pathologie`
--

INSERT INTO `pathologie` (`idPath`, `Nom_Path`) VALUES
(1, 'Cancer'),
(2, 'Sida'),
(3, 'Rhume'),
(4, 'Ebola'),
(5, 'Diabète'),
(6, 'TOP'),
(7, 'COVID-19'),
(8, 'COVID-21');

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `noSS` bigint(15) NOT NULL,
  `Nom_Patient` varchar(35) NOT NULL,
  `Prenom_Patient` varchar(20) NOT NULL,
  `Date_Naissance` date NOT NULL,
  PRIMARY KEY (`noSS`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `traitement`
--

DROP TABLE IF EXISTS `traitement`;
CREATE TABLE IF NOT EXISTS `traitement` (
  `Id_Ord` int(11) NOT NULL,
  `Id_Medic` int(11) NOT NULL,
  `Nb_Boite` int(11) NOT NULL,
  `DureeEnMois` int(11) NOT NULL,
  PRIMARY KEY (`Id_Ord`,`Id_Medic`),
  KEY `Id_Ord` (`Id_Ord`,`Id_Medic`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
