/**
 * Created by charly.blanc on 02/03/2015.
 */

//$(function() {

    function disparitionDesBoutonsGauche() {
        //$('#ombreRobot').remove();
        modifierDisposition();
        var i = 0;
        $('#message>div>div').fadeTo('medium', 0);
        $( "#btnDroiteDiv>" ).fadeOut( 2000, function() {
            i++;
            console.log(i);

            $( "#btnDroiteDiv>" ).remove();
            if (i==1){
                //$("#lignePrincipale" ).addClass( "memetaille", 500);
                //$(".col-lg-6" ).addClass( "memetaille", 500);
                setTimeout(function() {
                    /*$("#btnGaucheDiv").css('text-align', 'center');
                    $("#btnGaucheDiv").css('vertical-align', 'middle');*/
                    afficherMicroEtTexte();
                    grossirBoutonMicro();
                    console.log("json")

                    // Changer le text du message et l'afficher
                    $('#message>div>div').html('<span class="blanc">Dis moi</span> un moooooooooot').fadeTo('medium', 1);
                    //$('#message>div>div').html(' > <input id="mot" type="text" placeholder="mot clef">');
                    $('body').on('change', '#mot', function(){
                        9+
                        console.log("ddddd : "+ json)
                        dormir();
                    });
                }, 1000);
            }
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
     * Passer d'une grille de trois colonnes à une grille de  deux colonnes.
     * Faire disparaître sans la supprimer la colonne de droite
     */
    function modifierDisposition(){
        /*$( "#btnDroiteDiv>" ).fadeOut( 2000, function() {
            //$("#btnDroiteDiv").remove();
            $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-6", 1000);
            $("#zoneRobot").switchClass("col-lg-4", "col-lg-6", 1000);
            $('#btnDroiteDiv').switchClass("col-lg-4", "col-lg-0", 1000);
        });*/
        // grille de 1x4x1x6
        //$("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-1", 1000);
        //$('#zoneRobot').switchClass("col-lg-4", "col-lg-4", 1000);
        //$("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-offset-1 col-lg-6", 1000);
        $( "#btnDroiteDiv>div>img").animate({
            height: "+=50",
            width : "+=50"
        }, { duration: 1000, queue: false });
        $( "#btnGaucheDiv>" ).fadeOut(1000, function() {
            $("#btnGaucheDiv").switchClass("col-lg-4", "col-lg-1", 1000);
            //$('#zoneRobot').switchClass("col-lg-4", "col-lg-4", 1000);
            $("#btnDroiteDiv").switchClass("col-lg-4", "col-lg-offset-1 col-lg-6", 1000);
            $( "#btnGaucheDiv>" ).remove();
        });
    };

    /**
     * Afficher l'image du micro
     */
    function afficherMicro(){
        var btnMicro =
            "<img id='btnMicro' class='centrerVerticalement petit' src='static/app1/resources/imagesRoby/elementsGraphiques/roby_0003_bout-micro-big.png'>";
        $('#btnDroiteDiv').append(btnMicro);
    }

    /**
     * Afficher l'image du micro en petit avec le texte par dessus
     */
    function afficherMicroEtTexte(){
        var largeurDiv;
        largeurDiv = $("#zoneRobot").css('height');
        $("#btnDroiteDiv").css('height', largeurDiv);
        $('#btnDroiteDiv').addClass('image');
        var btnMicro =
            "<div class='centrerVerticalement'>" +
                "<img id='btnMicro' class='petit' src='static/app1/resources/imagesRoby/elementsGraphiques/roby_0003_bout-micro-big.png'>" +
                "<p class='textSurImage blanc'>Clique et parle</p>" +
            "</div>";
        $('#btnDroiteDiv').append(btnMicro);
        bindEventToSendOrderBySpeech();
    }

/////////////////////////////////////////////////////
var encours = false;

function bindEventToSendOrderBySpeech() {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    $('#btnMicro').click(function (e) {
        e.preventDefault();
        //$('#startRecognition').attr('disabled', 'disabled');
        if (encours){
            recognition.stop();
            encours = false;
        } else {
            encours = true;
            recognition.start();

        }

        //dormir();

    });

    /*$('#stopRecognition').click(function (e) {
     e.preventDefault();
     recognition.stop();
     $('#startRecognition').removeAttr('disabled')
     });*/

    recognition.onresult = function (event) {
        //console.log(event);
        var result = $('#message>div>div');
        var transcript;
        var fin=false;
        result.text('');
        for (var i = 0; i < event.results.length; i++) {
            var speechrecognitionResult = event.results[i];
            transcript = speechrecognitionResult[0].transcript;
            if (event.results[i].isFinal) {
                result.text(transcript);
                //recognition.stop();

                var json = {};
                var nouvelleImage;
                var phrase = transcript.split(" ");
                console.log("split : "+phrase)
                recognition.stop();
                encours = false;
                json.action = "apprendre";
                json.keyword = phrase;
                console.log(json)
                //webSocket.send(JSON.stringify(json));

                //$('#startRecognition').removeAttr('disabled')

                for (var j = 0; j < phrase.length; j++) {
                    if (phrase[j-1] == "apprendre") {
                        nouvelleImage = "static/app1/resources/imagesRoby/robyDodo.png";
                        json.action = "apprendre";
                        json.keyword = phrase[j];
                        lastKeyword = phrase[j];
                        //document.getElementById("roby").src = nouvelleImage;
                        msg.text = "Je vais apprendre à reconnaître des " + phrase[j];
                        window.speechSynthesis.speak(msg);
                        console.log("json boucle")
                        webSocket.send(JSON.stringify(json));
                        dormir();
                    }

                    /*if (phrase[j] == "photo" || phrase[j] == "photos"){
                     takepicture();
                     }*/

                }

                break;
            } else {
                result.text($('#vocalResult').text() + transcript);
            }
        }
        
    }
}







/////////////////////////////////////////

    /*

     <div class="centrerVerticalement">
     <img id="btnMicro" class="normal" src="resources/imagesRoby/elementsGraphiques/roby_0003_bout-micro-big.png" style="display: inline-block;">
     <p class="textSurImage">blabla</p>
     </div>

    <div class="image">

    <img src="images/3754004820_91a5c238a0.jpg" alt="" />

    <h2>A Movie in the Park:<br />Kung Fu Panda</h2>

    </div>

     .image {
     position: relative;
}

h2 {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
}
    */

    /**
     * Animation du bouton micro puis affichage du texte par dessus
     */
    function grossirBoutonMicro(){
        setTimeout(function() {
            $( "#btnMicro" ).switchClass( "petit", "normal", 2000, function(){
                $('.textSurImage').fadeIn();
            });
        }, 50);
    }

    // Lancement de l'enchainement des animations au chargement de la page
    $(window).load(function(){
        // Le code placé ici sera déclenché
        // au chargement complet de la page.
        $("#btnDroiteDiv").click(function() {
            disparitionDesBoutonsGauche();
        });
    });
//});

$("#btnDroiteDiv>div>img").click(function() {
    accueilAffiche = false;
    disparitionDesBoutonsGauche();
    $('title').text("Apprendre un objet");
    $('title').change();
});

var nested = false;
function afficherNouvelleImage(src){
        if (!nested){
            $('#btnDroiteDiv').append('<div class="box size11" style="visibility: hidden;display: none;">1</div>');
            $('#btnDroiteDiv').nested({minWidth: 100});
            nested = true;
        }
            var boxes = makeBoxes(src);
            $('#btnDroiteDiv').append(boxes).nested('append', boxes);
    //$('#btnDroiteDiv').prepend('<img src='+src+' />');
}