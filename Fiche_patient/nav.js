/*
AUTEUR : DAVID Louis
Version : 1.2
Dernière modification : 23/10/2021
Utilité : Effectué l'animation de la navbar et garantir le bon fonctionnement de cet dernière
*/

document.addEventListener("DOMContentLoaded", function(event) {
    //Récupération des variables pour la navbar :
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Si pas de soucis dans les variables :
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // Affiche la navbar
                nav.classList.toggle('show2')
                // Affiche les icone
                toggle.classList.toggle('bx-x')
                // Ajoute le padding au body
                bodypd.classList.toggle('body-pd')
                // Ajoute le padding à l'header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    //Execution de la fonction (Ajout des paramètres) :
    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== Coloration des boutons =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))


});