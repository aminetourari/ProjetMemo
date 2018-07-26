/**
 * Created by charly.blanc on 16/02/2015.
 */

var animation = false;
var distanceLevitationRobot = 20;
var distanceLevitationOmbre = 10;

//$(function() {



    /**
     * Lancement de la boucle du mouvement perpetuel du robot (lévitation)
     * Avec un premier déplacement vers le haut
     */
    function animerRobotVersLeHautLancement(){
        animation = true;

        //console.log("fonction appelée : animerRobotVersLeHautLancement()");
        $( "#imageRobott" ).animate({
            bottom: "+="+distanceLevitationRobot+"px"
        }, 3000, animerRobotVersLeBas());
        //$("#ombre").animate({
        //    height: "-=20",
        //    opacity: 0.25
        //}, { duration: 3000, queue: false });
        $("#ombreRobot").animate({
            bottom: "-="+distanceLevitationOmbre+"px"
        }, { duration: 3000, queue: false });
    };

    /**
     * Lancement de la boucle du mouvement perpetuel du robot (lévitation)
     * Avec un premier déplacement vers le bas
     */
    function animerRobotVersLeBasLancement(){
        //console.log("fonction appelée : animerRobotVersLeBasLancement()");
        $( "#imageRobott" ).animate({
            bottom: "-="+distanceLevitationRobot+"px"
        }, 3000, animerRobotVersLeHaut());
        $("#ombre").animate({
            height: "+=20",
            opacity: 1
        }, { duration: 3000, queue: false });
        $("#ombreRobot").animate({
            bottom: "+="+distanceLevitationOmbre+"px"
        }, { duration: 3000, queue: false });
    };

    /**
     * Déplacement du robot vers le bas avec gestion de son ombre
     */
    function animerRobotVersLeBas(){
        if (animation){
            setTimeout(function() {
                //console.log("fonction appelée : animerRobotVersLeBas()");
                $( "#imageRobott" ).animate({
                    bottom: "-="+distanceLevitationRobot+"px"
                }, 3000, animerRobotVersLeHaut());
                $("#ombre").animate({
                    height: "+=20",
                    opacity: 1
                }, { duration: 3000, queue: false });
                $("#ombreRobot").animate({
                    bottom: "+="+distanceLevitationOmbre+"px"
                }, { duration: 3000, queue: false });
            }, 3000 );
        }
    };

    /**
     * Déplacement du robot vers le haut avec gestion de son ombre
     */
    function animerRobotVersLeHaut(){
        if (animation) {
            setTimeout(function () {
                //console.log("fonction appelée : animerRobotVersLeHaut()");
                $("#imageRobott").animate({
                    bottom: "+="+distanceLevitationRobot+"px"
                }, 3000, animerRobotVersLeBas());
                $("#ombre").animate({
                    height: "-=20",
                    opacity: 0.25
                }, {duration: 3000, queue: false});
                $("#ombreRobot").animate({
                    bottom: "-="+distanceLevitationOmbre+"px"
                }, {duration: 3000, queue: false});
            }, 3000);
        }
    };




    // Lancement de l'enchainement des animations au chargement de la page
    $(window).load(function(){
        // Le code placé ici sera déclenché
        // au chargement complet de la page.
        animerRobotVersLeHautLancement();
    });

    var dodo=false;
    function dormir(){
        dodo=true;
        var paupieresHautesFermes = "<img id='paupieresHautesFermes' class='normal' src='static/app1/resources/imagesRoby/morceauxDeRoby/roby_0022_paupiere-hautes.png' alt='roby'>";
        $('#imageRobott').append(paupieresHautesFermes);

        setTimeout(function(){
            var paupieresBassesFermes = "<img id='paupieresBassesFermes' class='normal' src='static/app1/resources/imagesRoby/morceauxDeRoby/roby_0021_paupiere-basses.png' alt='roby'>";
            $('#imageRobott').append(paupieresBassesFermes);
        }, 120);

        //setTimeout(function() {
            $('#robyBouche').attr("src", 'static/app1/resources/imagesRoby/morceauxDeRoby/roby_0020_bouche-wait.png');

        //}, 400);

    }

    function reveiller(){
        $('#paupieresBassesFermes').remove();
        $('#paupieresHautesFermes').remove();
        $('#robyBouche').attr("src", 'static/app1/resources/imagesRoby/morceauxDeRoby/roby_0029_sourire1.png');
        dodo=false;
    }

//});