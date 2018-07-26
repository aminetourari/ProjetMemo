/**
 * Created by charly.blanc on 16/03/2015.
 */

// Ca marche
//$('body').on('click', function(){
//    alert('utilisateur : ' + username);
//});
var accueilAffiche = false;
        console.log("Micro Photo")
        $.getScript('static/app1/scripts/afficherMicro.js');
        $.getScript('static/app1/scripts/afficherPhoto.js');
function ecouteurMenu(){
    $('#item1').on("click", function () {
        accueil();
        //reprendreMouvementDesYeux();
        suivreLaSourisDesYeux();
        reveiller();
    });

    $('#item2').on("click", function () {
        accueilAffiche = false;
        deconnexion();
    });

    $('#item3').on("click", function () {
        accueilAffiche = false;
        reconnaitreUnObjet();
        //reprendreMouvementDesYeux();
        suivreLaSourisDesYeux();
        reveiller();
    });

    $('#item4').on("click", function () {
        accueilAffiche = false;
        apprendreUnObjet();
        //reprendreMouvementDesYeux();
        suivreLaSourisDesYeux();
        reveiller();
    });

    $('#item5').on("click", function () {
        accueilAffiche = false;
        //arreterMouvementDesYeux();
        tousMesObjets();
        reveiller();
    });
}

function accueil(){
    var title = $('title').text();
    switch (title)
    {
        case "Accueil": alert("Déjà sur la page");
            break;
        case "Bonjour": alert("Connecte toi pour accéder à cette section");
            break;
        case "Reconnaître un objet":
            $('#message>div').fadeTo('medium', 0, function(){
                //$('#message>div>div').html('<span class="blanc">POUET</span> un objet').fadeTo('medium', 1);
                $.get("static/app1/accueil/messageAccueil.html", function(data) {
                    data = data.replace('XXX', username);
                    $("#message>div").replaceWith(data).fadeTo('medium', 1);
                });
            });
            $( "#btnGaucheDiv>" ).fadeOut( 2000, function() {

                $("#btnGaucheDiv>").remove();
                $("#btnGaucheDiv").switchClass("col-lg-6", "col-lg-4", 2000);
                $('#zoneRobot').switchClass("col-lg-offset-1", "", 2000);
                $("#btnDroiteDiv").switchClass("col-lg-1", "col-lg-4", 2000);

                $('#btnDroiteDiv').css('left', '');
                $('#btnGaucheDiv').css('left', '');
                if (!accueilAffiche){
                    afficherAccueil();
                    //alert("une seule");
                    accueilAffiche = true;
                }
            });

            //setTimeout(function(){
            //    afficherAccueil();
                //alert("accueil");
            //},4001);

            $('title').text("Accueil");
            $('title').change();
            break;
        case "Apprendre un objet":
            $('#message>div').fadeTo('medium', 0, function(){
                //$('#message>div>div').html('<span class="blanc">POUET</span> un objet').fadeTo('medium', 1);
                $.get("static/app1/accueil/messageAccueil.html", function(data) {
                    data = data.replace('XXX', username);
                    $("#message>div").replaceWith(data).fadeTo('medium', 1);
                });
            });
            $( "#btnDroiteDiv>" ).fadeOut( 2000, function() {

                $("#btnDroiteDiv>").remove();
                $("#btnGaucheDiv").switchClass("col-lg-1", "col-lg-4", 2000);
                //$('#zoneRobot').switchClass("col-lg-4", "col-lg-4", 2000);
                $("#btnDroiteDiv").switchClass("col-lg-offset-1 col-lg-6", "col-lg-4", 2000);

                $('#btnDroiteDiv').css('left', '');
                $('#btnGaucheDiv').css('left', '');
                if (!accueilAffiche){
                    afficherAccueil();
                    accueilAffiche = true;
                    //alert("une seule");
                }

            });

            //setTimeout(function(){
                //afficherAccueil();
                //alert("accueil");
            //},4001);

            $('title').text("Accueil");
            $('title').change();
            break;
        case "Tous mes objets":
            masquerEtSupprimerContainer(2000, reconstruireGrille, afficherAccueil);

            $("#robyCoin").fadeTo(1000, 0, function(){
                $(this).remove();
            });

            $('title').text("Accueil");
            $('title').change();
            break;
        default: alert();
            break;
    }
}

function deconnexion(){
    var title = $('title').text();
    switch (title)
    {
        case "Accueil":
            break;
        case "Bonjour": alert("Déjà sur la page");
            break;
        case "Reconnaître un objet":
            break;
        case "Apprendre un objet":
            break;
        case "Tous mes objets":
            break;
        default: alert("TODO");
            break;
    }
}

function reconnaitreUnObjet(){
    var title = $('title').text();
    switch (title)
    {
        case "Accueil":
            disparitionDesBoutonsDroite();
            $('title').text("Reconnaître un objet");
            $('title').change();
            break;
        case "Bonjour": alert("Connecte toi pour accéder à cette section");
            break;
        case "Reconnaître un objet": alert("Déjà sur la page");
            break;
        case "Apprendre un objet":
            $('#message>div>div').fadeTo('medium', 0, function(){
                $('#message>div>div').html('<span class="blanc">Montre moi</span> un objet').fadeTo('medium', 1);
            });
            //$( "#btnDroiteDiv>" ).fadeOut( 2000, function() {
            $( "#btnDroiteDiv>" ).fadeOut( 2000, function() {
                $("#btnDroiteDiv>").remove();
                $("#btnGaucheDiv").switchClass("col-lg-1", "col-lg-6", 2000);
                $('#zoneRobot').addClass("col-lg-offset-1", 2000);
                $("#btnDroiteDiv").switchClass("col-lg-offset-1 col-lg-6", "col-lg-1", 2000);

                //afficherCadrePhoto();
            });

            setTimeout(function(){
                afficherCadrePhoto();
            },4001);


            $('title').text("Reconnaître un objet");
            $('title').change();

            break;
        case "Tous mes objets":
            masquerEtSupprimerContainer(2000, reconstruireGrilleDroite, deplacerGrilleDroite);
            $("#robyCoin").fadeTo(1000, 0, function(){
                $(this).remove();
            });

            $('title').text("Reconnaître un objet");
            $('title').change();
            break;
        default: alert();
            break;
    }
}

function apprendreUnObjet(){
    var title = $('title').text();
    console.log("rappeUnObjet")
    switch (title)
    {

        case "Accueil":
            disparitionDesBoutonsGauche();
            $('title').text("Apprendre un objet");
            $('title').change();
            break;
        case "Bonjour": alert("Connecte toi pour accéder à cette section");
            break;
        case "Reconnaître un objet":

            $('#message>div>div').fadeTo('medium', 0, function(){
                $('#message>div>div').html('<span class="blanc">Dis moi</span> un mot').fadeTo('medium', 1);
            });
            $( "#btnGaucheDiv>" ).fadeOut( 2000, function() {

                $("#btnGaucheDiv>").remove();
                $("#btnGaucheDiv").switchClass("col-lg-6", "col-lg-1", 2000);
                $('#zoneRobot').switchClass("col-lg-offset-1", "",  2000);
                $("#btnDroiteDiv").switchClass("col-lg-1", "col-lg-6 col-lg-offset-1", 2000);

                setTimeout(function(){
                    afficherMicroEtTexte();
                    grossirBoutonMicro();
                },2001);

            });

            $('title').text("Apprendre un objet");
            $('title').change();

            break;
        case "Apprendre un objet": alert("Déjà sur la page");
            break;
        case "Tous mes objets":
            masquerEtSupprimerContainer(2000, reconstruireGrilleGauche, deplacerGrilleGauche);
            $("#robyCoin").fadeTo(1000, 0, function(){
                $(this).remove();
            });

            $('title').text("Apprendre un objet");
            $('title').change();
            break;
        default: alert();
            break;
    }
}

function tousMesObjets(){
    var title = $('title').text();
    switch (title)
    {
        case "Accueil":
            break;
        case "Bonjour": alert("Connecte toi pour accéder à cette section");
            break;
        case "Reconnaître un objet":
            break;
        case "Apprendre un objet":
            break;
        case "Tous mes objets": alert("Déjà sur la page");
            break;
        default: alert();
            break;
    }
}

function reconstruireGrille(callback){

    //<div id="message" class="row text-center"></div>
    //<div class="row text-center" id="secondeLigne">

    //Remettre l'arc du haut
    $("#container").addClass("containerSombre");
    //Remettre l'arc du bas
    $('body').css('background-image', '');

    $('#container').append("<div id='message' class='row text-center'><div id='helloValty'></div></div>");

    $('#container').append("<div class='row text-center' id='secondeLigne'>");

    $.get("static/app1/accueil/secondeLigne.html", function(data) {
        //data = data.replace('XXX', username);
        //alert(data);
        $("#secondeLigne").replaceWith(data);

        $( ".petit" ).switchClass( "petit", "normal", 2000);

        // Si une  fonction de callback est définie > l'éxécuter
        if (callback != null){
            setTimeout(function(){
                callback();
            }, 2000);
        }
    });

}

function reconstruireGrilleGauche(callback){
    //Remettre l'arc du haut
    $("#container").addClass("containerSombre");
    //Remettre l'arc du bas
    $('body').css('background-image', '');

    $('#container').append("<div id='message' class='row text-center'><div class='row' style='padding-top: 100px'><div class='text-center message'></div></div></div>");

    $('#message>div>div').fadeTo('medium', 0, function(){
        $('#message>div>div').html('<span class="blanc">Dis moi</span> un mot');
    });


    $('#container').append("<div class='row text-center' id='secondeLigne'>");

    $.get("static/app1/accueil/secondeLigne.html", function(data) {
        //data = data.replace('XXX', username);
        $("#secondeLigne").replaceWith(data);

        // Faire apparapitre le robot depuis le fond de l'écran
        $( ".petit" ).switchClass( "petit", "normal", 2000);

        // Si une  fonction de callback est définie > l'éxécuter
        if (callback != null){

            if (!animation){
                animerRobotVersLeHautLancement();
            }
            setTimeout(function(){
                $('#message>div>div').fadeTo('medium', 1);
                callback();
            }, 2000);
        }
    });
}

function deplacerGrilleGauche(){
    $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-1", 1000);
    //$('#zoneRobot').addClass("col-lg-offset-1", 1000);
    $("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-offset-1 col-lg-6", 1000);
    setTimeout(function() {
        /*$("#btnGaucheDiv").css('text-align', 'center');
         $("#btnGaucheDiv").css('vertical-align', 'middle');*/
        afficherMicroEtTexte();
        grossirBoutonMicro();
        // Changer le text du message et l'afficher

        /*$.get("accueil/messageAccueil.html", function(data) {
            data = data.replace('XXX', username);
            //alert(data);
            $("#helloValty").replaceWith(data);
        });*/

    }, 1000);
}

function reconstruireGrilleDroite(callback){
    //Remettre l'arc du haut
    $("#container").addClass("containerSombre");
    //Remettre l'arc du bas
    $('body').css('background-image', '');

    $('#container').append("<div id='message' class='row text-center'><div class='row' style='padding-top: 100px'><div class='text-center message'></div></div></div>");

    $('#message>div>div').fadeTo('medium', 0, function(){
        $('#message>div>div').html('<span class="blanc">Montre moi</span> un objet');
    });


    $('#container').append("<div class='row text-center' id='secondeLigne'>");

    $.get("static/app1/accueil/secondeLigne.html", function(data) {
        //data = data.replace('XXX', username);
        $("#secondeLigne").replaceWith(data);

        // Faire apparapitre le robot depuis le fond de l'écran
        $( ".petit" ).switchClass( "petit", "normal", 2000);

        // Si une  fonction de callback est définie > l'éxécuter
        if (callback != null){

            if (!animation){
                animerRobotVersLeHautLancement();
            }
            setTimeout(function(){
                $('#message>div>div').fadeTo('medium', 1);
                callback();
            }, 2000);
        }
    });
}

function deplacerGrilleDroite(){
    $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-6", 1000);
    $('#zoneRobot').addClass("col-lg-offset-1", 1000);
    $("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-1", 1000);
    setTimeout(function() {
        /*$("#btnGaucheDiv").css('text-align', 'center');
         $("#btnGaucheDiv").css('vertical-align', 'middle');*/
        afficherCadrePhoto();
        // Changer le text du message et l'afficher

        /*$.get("accueil/messageAccueil.html", function(data) {
         data = data.replace('XXX', username);
         //alert(data);
         $("#helloValty").replaceWith(data);
         });*/

    }, 1000);
}