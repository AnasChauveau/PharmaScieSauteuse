let a = 1;
let b = 0;

function newline(){
    let ecriture = "<div id='T"+a+"' class='align'><select class='field3' id='Count"+a+"' name='traitement"+a+"' required><option value='0' selected>- Choix Médicament -</option><% medicaments.forEach(function(medicament){ %> <option value='<%=medicament.idMedic%>'><%=medicament.Nom_Medic%></option> <% }) %></select>";
    ecriture += "<input type='number' class='field1' name='Qte"+a+"' id='LaQte"+a+"' placeholder='Quantité (mois)*' required>";
    ecriture += "<input type='number' class='field1'name='duree"+a+"' id='LaDuree"+a+"' placeholder='Durée traitement (mois)*' required><button id='del"+a+"' onclick='delline()'>x</button></div>";
    document.getElementById('T'+b).insertAdjacentHTML('afterend', ecriture);
    a = a+1
    b = b+1
    document.getElementById('nbT').value = a;
}

function delline(){
    a = a-1
    b = b-1
    var select = document.getElementById("Count"+a);
    select.remove();
    var Qte = document.getElementById("LaQte"+a);
    Qte.remove();
    var duree = document.getElementById("LaDuree"+a);
    duree.remove();
    var delbtn = document.getElementById("del"+a);
    delbtn.remove();
    var delDiv = document.getElementById("T"+a);
    delDiv.remove();
    document.getElementById('nbT').value = a;
}