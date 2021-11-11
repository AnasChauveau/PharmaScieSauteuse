-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 26 oct. 2021 à 09:50
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
  `noAssur` int(11) NOT NULL,
  `Nom_Assur` varchar(30) NOT NULL,
  PRIMARY KEY (`noAssur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `echeance`
--

DROP TABLE IF EXISTS `echeance`;
CREATE TABLE IF NOT EXISTS `echeance` (
  `no_Pat` int(11) NOT NULL,
  `no_Assur` int(11) NOT NULL,
  `Fin_Assurance` date NOT NULL,
  PRIMARY KEY (`no_Pat`,`no_Assur`),
  KEY `no_Pat` (`no_Pat`,`no_Assur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
CREATE TABLE IF NOT EXISTS `medecin` (
  `idMede` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Mede` varchar(50) NOT NULL,
  `Prenom_Mede` varchar(25) NOT NULL,
  PRIMARY KEY (`idMede`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `medicament`
--

DROP TABLE IF EXISTS `medicament`;
CREATE TABLE IF NOT EXISTS `medicament` (
  `idMedic` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Medic` varchar(40) NOT NULL,
  `Qte_En_Stock` int(11) NOT NULL,
  `Qte_Necessaire` int(11) NOT NULL,
  PRIMARY KEY (`idMedic`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

DROP TABLE IF EXISTS `ordonnance`;
CREATE TABLE IF NOT EXISTS `ordonnance` (
  `noOrd` int(11) NOT NULL,
  `No_SS` int(11) NOT NULL,
  `Id_Path` int(11) NOT NULL,
  `Id_Mede` int(11) NOT NULL,
  PRIMARY KEY (`noOrd`),
  KEY `Id_Patient` (`No_SS`,`Id_Path`),
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `noSS` int(11) NOT NULL,
  `Nom_Patient` varchar(50) NOT NULL,
  `Prenom_Patient` varchar(20) NOT NULL,
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
  `Fin_Medic` date NOT NULL,
  PRIMARY KEY (`Id_Ord`,`Id_Medic`),
  KEY `Id_Ord` (`Id_Ord`,`Id_Medic`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
