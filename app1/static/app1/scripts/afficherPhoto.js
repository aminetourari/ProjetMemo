/**
 * Created by charly.blanc on 02/03/2015.
 */

//$(function() {

    var canvas;
    var video;
    var width = 390;
    var height = 0;

    function disparitionDesBoutonsDroite() {
        //$('#ombreRobot').remove();
        modifierDispositionA();
        var i = 0;
        $('#message>div>div').fadeTo('medium', 0);
        $( "#btnGaucheDiv>" ).fadeOut( 2000, function() {
            i++;
            console.log(i);

            $( "#btnGaucheDiv>" ).remove();
            //if (i==4){ // Pas pour la single page app
                //$("#lignePrincipale" ).addClass( "memetaille", 500);
                //$(".col-lg-6" ).addClass( "memetaille", 500);
                setTimeout(function() {
                    /*$("#btnGaucheDiv").css('text-align', 'center');
                     $("#btnGaucheDiv").css('vertical-align', 'middle');*/
                    afficherCadrePhoto();
                    //grossirCadrePhoto();
                    // Changer le text du message et l'afficher
                    $('#message>div>div').html('<span class="blanc">Montre moi</span> un objet').fadeTo('medium', 1);
                    //$('#message');
                }, 1000);
            //}
        });
        //cacherLesBoutons();
        //supprimerLesBoutons();
    };

    /**
     * Faire disparaitre les boutons progressivement puis les supprimer
     */
    function cacherLesBoutons(){
        $('#btnGaucheDiv').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 1000});
        $('#btnDroiteDiv').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 1000});
    }

    function supprimerLesBoutons(){
        setTimeout(function() {
            $("#imageRobott").switchClass("col-lg-4", "col-lg-12", 500);
            $('#ombreRobot').switchClass("col-lg-4", "col-lg-12", 500);
            $("#btnGaucheDiv").remove();
            $("#btnDroiteDiv").remove();
        }, 2000);
    };

    /**
     * Passer d'une grille de 4x4x4 à une grille de 1x4x1x6
     * Faire disparaître la colonne de gauche
     */
    function modifierDispositionA(){
        /*$( "#btnGaucheDiv>" ).fadeOut(2000, function() {
            $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-1", 1000);
            //$('#zoneRobot').switchClass("col-lg-4", "col-lg-4", 1000);
            $("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-offset-1 col-lg-6", 1000);
        });*/
        // grille de 6x6x0
        $( "#btnGaucheDiv>div>img").animate({
            height: "+=50",
            width : "+=50"
        }, { duration: 1000, queue: false });
        $( "#btnDroiteDiv>" ).fadeOut(1000, function() {
            $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-6", 1000);
            $('#zoneRobot').addClass("col-lg-offset-1", 1000);
            $("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-1", 1000);
            $( "#btnDroiteDiv>" ).remove();
        });
    };

    function afficherCadrePhoto(){
        var largeurDiv;
        largeurDiv = $("#zoneRobot").css('height');
        $("#btnGaucheDiv").css('height', largeurDiv);
        $('#btnGaucheDiv').addClass('image');
        var cadrePhoto =
            "<div id='cadreVideo' class='row'>" +
            "<video id='video'></video>" +
            "<div id='cercleBlanc' class='textSurImage'></div>" +
            "<p class='textSurImage blanc'>Vise au centre du carré</p>" +
            "<canvas id='canvas'></canvas>" +
            "<button id='btnPhoto' class='btn-block'><span class='glyphicon glyphicon-camera'></span> OK</button>" +
            "</div>";
         /*   "<div class='centrerVerticalement'>" +
            "<img id='cadrePhoto' class='petit' src='resources/imagesRoby/elementsGraphiques/roby_0003_bout-micro-big.png'>" +
            "<p class='textSurImage blanc'>Vise au centre du carré</p>" +
            "</div>";
        */
        $('#btnGaucheDiv').append(cadrePhoto);

        //Masquer le canvas qui contiendra la photo prise
        $('#canvas').css('display', 'none');
        //afficher ce que filme la webcam dans la balise vidéo qui vient d'être créée.
        initCamera();
    }

    /**
     * Calcul de la position du cercle blanc
     * Et mise à jour de ses propriétés css
     * Pour qu'il apparaîsse au centre de la vidéo
     */
    function centrerLeCercleBlanc(){
        var left = parseInt($('#cadreVideo').css('width'));
        var top = parseInt($('#cadreVideo').css('height'));
        var rayonCercle = parseInt($('#cercleBlanc').css('width'))/2;
        left = (left/2) - rayonCercle;
        top = (top/2) - rayonCercle;

        $('#cercleBlanc').css('left', left);
        $('#cercleBlanc').css('top', top);
    }

    function grossirCadrePhoto(){
        setTimeout(function() {
            $( "#cadrePhoto" ).switchClass( "petit", "normal", 2000, null);
        }, 50);
    }

    function afficherBoutonOK(){
        //var btnConnexion =
        //    "<div style='display: none;'>" +
        //    "<button id='btnPhoto' class='btn-block'><span class='glyphicon glyphicon-camera'></span> OK</button>" +
        //    "</div>";
        //$(btnConnexion).appendTo($('#cadreVideo')).slideDown("slow");
        setTimeout(function() {
            centrerLeCercleBlanc();
            $('#btnPhoto').slideDown("slow");
            $('.textSurImage').slideDown("slow");
        }, 2000);
    };

    /**
     * Supprimer la zone de vidéo et la remplacer par la zone photo
     * Disparition des textes au dessus de la zone de photo
     */
    function afficherResultatPhoto(){
        $('video').remove();
        $('#canvas').css('display', 'inline-block');

        $('#btnPhoto').slideUp("slow");
        $('.textSurImage').slideUp("slow");
        disparitionDesBoutonsDroite();

    }

    function regarderVersLaGauche(){
        $('#iris>img').animate({
            "left": "-=12px"
        }, 500);
        positionDesYeux = "gauche";
    };

    function initCamera() {
        var streaming = false,
            cover        = document.querySelector('#cover'),
            photo        = document.querySelector('#photo'),
            startbutton  = document.querySelector('#btnPhoto');
            video  = document.querySelector('#video'),
            canvas = document.querySelector('#canvas');

        navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.GetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function(stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                    alert("aaaa");
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);

                    afficherBoutonOK();
                }
                video.play();
            },
            function(err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function(ev){
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        /*startbutton.addEventListener('click', function(ev){
            takepicture();
            ev.preventDefault();
        }, false);*/

        $('#btnPhoto').on('click', takepicture);
    }

    function takepicture() {
        dormir();
        // changer l'image du robot le temps du traitement
        //document.getElementById("roby").src= "resources/imagesRoby/robyDodo.png";
        //width = 320;
        //height = 240;
        canvas.width = width;
        canvas.height = height;
        console.log(canvas);
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);

        var dataURL64 = canvas.toDataURL();
        var imageBase64= dataURL64.replace(/^data:image\/(png|jpg);base64,/, "");

        var jsonImage = {};
        jsonImage.action = "recevoirImage";
        jsonImage.image = imageBase64;

        msg.text = "Voyons voir si je reconnais cet objet !";
        window.speechSynthesis.speak(msg);

        webSocket.send(JSON.stringify(jsonImage));

        afficherResultatPhoto();
    }

    // Lancement de l'enchainement des animations au chargement de la page
    $(window).load(function(){
        // Le code placé ici sera déclenché
        // au chargement complet de la page.
        $("#btnGaucheDiv").click(function() {
            disparitionDesBoutonsDroite();
        });
    });
//});


$("#btnGaucheDiv>div>img").click(function() {
    accueilAffiche = false;
    disparitionDesBoutonsDroite();
    $('title').text("Reconnaître un objet");
    $('title').change();
});