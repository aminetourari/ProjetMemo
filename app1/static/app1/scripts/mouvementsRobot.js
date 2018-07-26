/**
 * Created by charly.blanc on 16/02/2015.
 */
$(function() {

    /**
     * Apparition du robot et de son ombre depuis le fond de l'écran
     */
    function apparitionValty(){
        //$( "#robyy" ).switchClass( "petit", "normal", 2000, apparitionHello());
        $( ".petit" ).switchClass( "petit", "normal", 2000, apparitionHello());
    };

    /**
     * Apparition du message de bienvenue
     */
    function apparitionHello() {
        setTimeout(function() {
            console.log("fonction appelée : apparitionHello()");
            $(".invisible").removeClass("invisible", 0, animerRobotVersLeHautLancement());
        }, 2000);
    };

    /**
     * Lancement de la boucle du mouvement perpetuel du robot (lévitation)
     * Avec un premier déplacement vers le haut
     */
    function animerRobotVersLeHautLancement(){
        console.log("fonction appelée : animerRobotVersLeHautLancement()");
        $( "#imageRobott" ).animate({
            bottom: "+=50"
        }, 3000, apparitionMessageDeConnexion());
        $("#ombre").animate({
            height: "-=20",
            opacity: 0.25
        }, { duration: 3000, queue: false });
        $("#ombreRobot").animate({
            bottom: "-=15px"
        }, { duration: 3000, queue: false });
    };

    /**
     * Lancement de la boucle du mouvement perpetuel du robot (lévitation)
     * Avec un premier déplacement vers le bas
     */
    function animerRobotVersLeBasLancement(){
        console.log("fonction appelée : animerRobotVersLeBasLancement()");
        $( "#imageRobott" ).animate({
            bottom: "-=50"
        }, 3000, animerRobotVersLeHaut());
        $("#ombre").animate({
            height: "+=20",
            opacity: 1
        }, { duration: 3000, queue: false });
        $("#ombreRobot").animate({
            bottom: "+=15px"
        }, { duration: 3000, queue: false });
    };

    /**
     * Déplacement du robot vers le bas avec gestion de son ombre
     */
    function animerRobotVersLeBas(){
        setTimeout(function() {
            console.log("fonction appelée : animerRobotVersLeBas()");
            $( "#imageRobott" ).animate({
                bottom: "-=50"
            }, 3000, animerRobotVersLeHaut());
            $("#ombre").animate({
                height: "+=20",
                opacity: 1
            }, { duration: 3000, queue: false });
            $("#ombreRobot").animate({
                bottom: "+=15px"
            }, { duration: 3000, queue: false });
        }, 3000 );
    };

    /**
     * Déplacement du robot vers le haut avec gestion de son ombre
     */
    function animerRobotVersLeHaut(){
        setTimeout(function() {
            console.log("fonction appelée : animerRobotVersLeHaut()");
            $( "#imageRobott" ).animate({
                bottom: "+=50"
            }, 3000,  animerRobotVersLeBas());
            $("#ombre").animate({
                height: "-=20",
                opacity: 0.25
            }, { duration: 3000, queue: false });
            $("#ombreRobot").animate({
                bottom: "-=15px"
            }, { duration: 3000, queue: false });
        }, 3000 );
    };

    /**
     *
     */
    function apparitionMessageDeConnexion(){
        //Continuer la lévithation du robot
        animerRobotVersLeBas();
        setTimeout(function() {
            var div = $('#helloValty>div');
            div.first().text("Connecte toi").css('color', 'black');
            div.next().text("pour me faire apprendre de nouveaux mots :");
        }, 2000);

    };

    // Lancement de l'enchainement des animations au chargement de la page
    $(window).load(function(){
        // Le code placé ici sera déclenché
        // au chargement complet de la page.
        apparitionValty();
    });

});