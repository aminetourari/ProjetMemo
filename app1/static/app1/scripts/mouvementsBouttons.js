/**
 * Created by clement.moly on 17/02/2015.
 */
//$(function() {
    var vitesse = 1000;

    function apparitionBoutonGauche() {
        console.log("fonction appelée : apparitionBoutonGauche()");
        $("#btnGaucheDiv").animate({
            left: "-=391px"
        }, vitesse, apparitionBoutonEnded);
        $("#btnGaucheDiv>div>img").switchClass("petit", "normal", vitesse);
    }

    function apparitionBoutonDroite() {
        console.log("fonction appelée : apparitionBoutonDroite()");
        $("#btnDroiteDiv").animate({
            left: "+=391px"
        }, vitesse, apparitionBoutonEnded);
        $("#btnDroiteDiv>div>img").switchClass("petit", "normal", vitesse);

    }

    function apparitionBoutonEnded() {
        console.log("fonction appelée : apparitionBoutonGaucheEnded()");
        $(".btnDiv div").fadeIn();
        $('.btnDiv').css('display', '');// Enlever display none
    }

    function apparitionBoutons(){
        console.log("fonction appelée : apparitionBoutons()");
        $('.invisible').switchClass("invisible", "btnDiv", 1000);

    }

    // Lancement du changement de fond au chargement de la page
    $(window).load(function(){
        //var body = document.getElementsByTagName("body")[0];
        //$( "body" ).addClass( "fondSombre", 3000);
        $("#container").addClass("containerSombre", 2000);
        $('body').addClass("fondSombre", 2000);
        $('.invisible').animate({
            opacity: 1
        }, 2000);

        apparitionBoutons();

        //$('.invisible').switchClass("invisible", "btnDiv", 1000);
        /*$('.btnDiv')[0].animate({
            visibility: visible
        }, 1000);*/

        //Déplacement des boutons après la modification du fond
        setTimeout(function() {
            apparitionBoutonGauche();
            apparitionBoutonDroite();
        }, 4000);
    });
//});

// Fonction qui peut être appelée par les fichiers externes
function executeAnimations(){
    /*$('.invisible').animate({
        opacity: 1
    }, 2000);*/

    apparitionBoutons();

    //Déplacement des boutons après la modification du fond
    setTimeout(function() {
        apparitionBoutonGauche();
        apparitionBoutonDroite();
    }, 1000);
}
