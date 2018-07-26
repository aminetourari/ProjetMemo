/**
 * Created by charly.blanc on 09/03/2015.
 */

    function construireCarousel(){
        var tailleCarousel = objetsConnus.length;
        var itemDuCarousel = "<div class='item'><h4>nomDeLItem</h4></div>";
        for (var i = 0; i < tailleCarousel; i++) {
            $('.owl-carousel').append(itemDuCarousel.replace('nomDeLItem', objetsConnus[i]));
        }

        var nbObjetsVisibles = 5;
        var barreDeNavigationVisible = true;
        if (tailleCarousel <5){
            nbObjetsVisibles = tailleCarousel;
            barreDeNavigationVisible = false;
        }
        if (objetsConnus==""){
            nbObjetsVisibles = 0;
        }
if(nbObjetsVisibles>0) {
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: ['', ''], // Enlève le text des boutons next/prev par défaut
        items: nbObjetsVisibles,
        //animateOut: 'fadeOut'
        lazyLoad: true, //effet de chargement des nouveaux items du caroussel
        //propriétés autoplay
        autoplay:true,
         autoplayTimeout:2500,
         autoplayHoverPause:true
    });

    var next = $('.owl-next');
    $("#flecheDroite").prepend(next);

    var prev = $('.owl-prev');
    $('#flecheGauche').prepend(prev);

    var image = '<img src="static/app1/resources/imagesRoby/elementsGraphiques/roby_0002_cloud-big.png">'
    $('.item').prepend(image);

    //setTimeout(function () {
    //    $('#itemfictif').remove();
    //}, 3000);
    //mettreAJourLeNombreDObjetsAppris();
}    };


    /*function mettreAJourLeNombreDObjetsAppris(){
        var nbObjets;
        nbObjets = $('.item').length - $('.cloned').length;

    }*/
//$(window).load(function() {
    //afficherCarousel();
//});