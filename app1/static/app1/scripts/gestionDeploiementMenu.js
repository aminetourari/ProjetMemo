/**
 * Created by charly.blanc on 17/02/2015.
 */

/**
 * Empecher la fermeture automatique du menu lors d'un clic sur la page
 */
    $('.dropdown.keepopen').on({
        "shown.bs.dropdown": function() { this.closable = false; },
        "click":             function() { this.closable = true; },
        "hide.bs.dropdown":  function() { return this.closable; }
    });

/**
 * Déploiement du menu
 */
$('.dropdown').on('show.bs.dropdown', function(e){
        console.log("show.bs.dropdown");
        // Changement de l'image du bouton du menu
        document.getElementById("boutonMenu").src = "static/app1/resources/imagesRoby/boutonMenuCroix.png";
        // Déploiement du menu avec effet  fadeIn sur chaque élément
        //$(this).find('.dropdown-menu').stop().slideDown('linear');
        $(this).find('.dropdown-menu').stop().show();
        $('#item1').css('opacity', 0).animate(
            { opacity: 1 },
            { queue: false, duration: 1000 });
        $('#item2').css('opacity', 0).animate(
            { opacity: 1 },
            { queue: false, duration: 2000 });
        $('#item3').css('opacity', 0).animate(
            { opacity: 1 },
            { queue: false, duration: 3000 });
        $('#item4').css('opacity', 0).animate(
            { opacity: 1 },
            { queue: false, duration: 3500 });
        $('#item5').css('opacity', 0).animate(
            { opacity: 1 },
            { queue: false, duration: 4000 });
});

/**
 * Disparition du menu
 */
$('.dropdown').on('hide.bs.dropdown', function(e){
    if (this.closable) {
        console.log("fermeture du menu");
        // Changement de l'image du bouton du menu
        document.getElementById("boutonMenu").src = "static/app1/resources/imagesRoby/boutonMenu.png";
        // Disparition du menu avec effet  fadeOut sur chaque élément
        $(this).find('.dropdown-menu').stop().slideUp('linear');
        $('#item5').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 200});
        $('#item4').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 400});
        $('#item3').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 600});
        $('#item2').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 800});
        $('#item1').stop().css('opacity', 1).animate(
            {opacity: 0},
            {queue: false, duration: 1000});
    } else {
        console.log("fermeture du menu empéché");
    }
});

// Au chargement de la page
$(function() {
    function deploiementDuMenu(){
        $('.dropdown-menu').dropdown('toggle');
        $('.keepopen').closable = true;
    };

    // deployer le menu après 2 secondes
    setTimeout(function() {
        //deploiementDuMenu();
    }, 2000);

});