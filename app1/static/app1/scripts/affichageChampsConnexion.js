
/**
 * Created by charly.blanc on 24/02/2015.
 */

var username = 'inconnu';
var champIdentNotNull = false;
var champPassNotNull = false;
var btnConnexionAffiched = false;
var positionDesYeux = "centre";
var positionMilieu = window.screen.width / 2;
var stopMouvementsYeux = false;

//$(function() {

    /**
     * Apparition du robot et de son ombre depuis le fond de l'écran
     */
    function apparitionValty(){
        console.log("fonction appelée : apparitionValty()");
        //$( "#robyy" ).switchClass( "petit", "normal", 2000, apparitionHello());
        $( ".petit" ).switchClass( "petit", "normal", 2000, apparitionMessageDeBienvenue());
    };

    /**
     * Apparition du message de bienvenue
     */
    function apparitionMessageDeBienvenue() {
        setTimeout(function() {
            console.log("fonction appelée : apparitionMessageDeBienvenue()");
            $(".invisible").removeClass("invisible", 0, apparitionMessageDeConnexion());
        }, 2000);
    };

    /**
     * Modification du message d'en tête pour inviter l'utilisateur à se connecter
     */
    function apparitionMessageDeConnexion(){
        setTimeout(function() {
            var div = $('#helloValty>div');
            console.log("fonction appelée : apparitionMessageDeBienvenue()");
            div.first().text("Connecte toi").css('color', 'black');
            div.next().text("pour me faire apprendre de nouveaux mots :");
            apparitionChampIdentifiant();
            //descendre();
            apparitionJeVeuxCreerUnCompte();
            //regarderVersLeHaut();
            suivreLaSourisDesYeux();
        }, 2000);
    };

    /**
     * Apparition du champs de saisie d'identification
     */
    function apparitionChampIdentifiant(){
        setTimeout(function() {
            var champIdent =
                "<div style='display: none; padding-top: 10px' id='identifiant' class='col-lg-4 col-lg-offset-4'>" +
            "<input id='ident' type='text' placeholder='Ton identifiant'>" +
            "</div>";
            $(champIdent).appendTo($('#helloValty')).slideDown("slow");
            //$('#helloValty').slideDown(500).append(champIdent);
            apparitionFleche();
            apparitionChampPass();
        }, 2000);
    };

    //////////////////////////////////////////////
    //function apparitionDouce() {
    //    var i = 0;
    //    $("button").click(function() {
    //        if (i < 10) {
    //            $('<div style="display: none;" class="new-link" name="link[]"><input type="text" /></div><div style="display: none;" class="new-link" name="link[]"><input type="text" /></div><div style="display: none;" class="new-link" name="link[]"><input type="text" /></div><div style="display: none;" class="new-link" name="link[]"><input type="text" /></div>').appendTo($('.insert-links')).slideDown("slow");
    //            i++;
    //        }
    //    });
    //}
    ///////////////////////////////////

    /**
     * Apparition de l'image de la flèche verticale
     */
    function apparitionFleche(){
        setTimeout(function() {
            var fleche =
                "<div style='display: none;' class='col-lg-4 col-lg-offset-4 flecheVerticale'>" +
                    "<img src='static/app1/resources/imagesRoby/fleche_vers_le_bas.png' />" +
                "</div>";
            $(fleche).appendTo($('#helloValty')).slideDown("slow");
        }, 1000);
    };


    /**
     * Apparition du champ de saisie de mot de passe
     */
    function apparitionChampPass(){
        setTimeout(function() {
            var champPass =
                "<div style='display: none;' id='motDePasse' class='col-lg-4 col-lg-offset-4'>" +
                    "<input type='password' placeholder='Ton mot de passe'>" +
                "</div>";
            $(champPass).appendTo($('#helloValty')).slideDown("slow");
            apparitionFleche();
            //apparitionBoutonConnexion();
        }, 2000);
    };

    function afficherBoutonConnexion(){
        console.log("affichage btn connexion");
        //setTimeout(function() {
            var btnConnexion =
                "<div style='display: none;' id='btnconnection' class='col-lg-4 col-lg-offset-4'>" +
                    "<button id='startbutton' class='btn-block'><span class='glyphicon glyphicon-off'></span> Connexion</button>" +
                     //"<input type='image' src='resources/imagesRoby/elementsGraphiques/roby_0011_bout-bulle-connect.png' />" +
                "</div>";
            $(btnConnexion).appendTo($('#helloValty')).slideDown("slow");
             btnConnexionAffiched = true;

            //Ecouteur de l'évenement click bouton sur 'nouveau compte'
            //$('#btnconnection').on('click', supprimerFormulaire);

            // Lancer l'animation une seul fois.
            // La variable btnConnexionClikable permet de controler et d'éviter  de déclencher plusieurs fois l'animation
            var btnConnexionClickable = true;
            $('#btnconnection').on('click', function(){
                if (btnConnexionClickable){
                    btnConnexionClickable = false;

                    supprimerFormulaire();
                    envoyerPseudoUtilisateurConnecteAuServeur();
                }
                setTimeout(function(){
                    btnConnexionClickable = true;
                }, 2000);
            });
        //}, 2000);
    };

    function apparitionJeVeuxCreerUnCompte(){
        setTimeout(function() {
            var btnNouveauCompte =
                "<div id='nouveauCompte' class='col-lg-12'>" +
                    "<span>Je veux créer un  compte</span>" +
                    "<button id='btnNouveauCompte'><img src='static/app1/resources/imagesRoby/elementsGraphiques/roby_0010_fleche-bleu-droite.png'></button>" +
                "</div>";
            $('.container').last().append(btnNouveauCompte);

            //Ecouteur de l'évenement click bouton sur 'nouveau compte'
            $('#nouveauCompte').on('click', afficherFormulaireInscription);
        }, 2000);
    };

    function afficherFormulaireInscription(){
        masquerEtSupprimerContainer(2000, testouille, null);
        champIdentNotNull = false;
        champPassNotNull = false;
        btnConnexionAffiched = false;
    };

    /**
     * Disparition progressive du bloc container (effet diapo)
     * Et suppression de son contenu
     * @param tempsAnimation : durée en millisecondes de l'animation de disparition
     * @param callback : fonction appelée à la fin de l'animation
     */
    function masquerEtSupprimerContainer(tempsAnimation, callback, callbackSuivant){
        //Déplacer et masquer le bloc entier
        $(".container").animate({
            opacity: 0,
            'marginLeft': "-650px"
        }, tempsAnimation, function(){
            //Supprimer
            $('.container>*').remove();
            //Replacer le container
            $('.container').css('opacity', 1);
            $('.container').css('marginLeft', '');
        });
        setTimeout(function() {
            if (callback != null)
                callback(callbackSuivant);
        }, tempsAnimation+500);
    }

    function descendre(){
        console.log("DESCENTE");
        $( "#imageRobott" ).animate({
            bottom: "-=200px"
        }, 2000, apparitionChampIdentifiant());
        $("#ombreRobot").animate({
            bottom: "-=200px"
        }, { duration: 2000, queue: false });
    };

    /**
     * Le robot lèvent ses yeux au ciel
     */
    function regarderVersLeHaut(){
        alert("vers le haut");
        $('#iris>img').animate({
            "top": "-=8px"
        }, 500);
        positionDesYeux = "haut";
        positionDesYeux = "centre";

        orienterLesYeuxVersLaSouris();

    };

    function arreterMouvementDesYeux(){
        alert("arret mvnt yeux");
        stopMouvementsYeux = true;
        //$('body').removeEventListener('mousemove', orienterLesYeuxVersLaSouris);
        $("body").off("mousemove");
        positionDesYeux = 'centre';
    }

    function reprendreMouvementDesYeux(){
        alert("reprise mvnt yeux");
        setTimeout(function(){
            stopMouvementsYeux = false;
            orienterLesYeuxVersLaSouris();
        }, 3000);

    }

    /**
     * Gestion du mouvement des yeux en fonction de la position de la souris A partir de ce moment
     */
    function orienterLesYeuxVersLaSouris(){
        $('body').mousemove(function(event) {

            if(stopMouvementsYeux){
                console.log("suivi des yeux STOP");
                positionDesYeux = "centre";
                return;
            }else{
                console.log("suivi des yeux OK " + positionDesYeux);
                positionMilieu = window.screen.width / 2;
                var bordureMilieuInf = positionMilieu - 100;
                var bordureMilieuSup = positionMilieu + 100;
                var positionSouris = event.pageX;
                if (positionSouris > bordureMilieuSup && positionDesYeux=="centre"){
                    regarderVersLaDroite();
                    positionDesYeux = "droite";
                }
                if (positionSouris > bordureMilieuInf && positionDesYeux=="gauche"){
                    regarderVersLaDroite();
                    positionDesYeux = "centre";
                }
                if (positionSouris < bordureMilieuInf && positionDesYeux=="centre"){
                    regarderVersLaGauche();
                    positionDesYeux = "gauche";
                }
                if (positionSouris < bordureMilieuSup && positionDesYeux=="droite"){
                    regarderVersLaGauche();
                    positionDesYeux = "centre";
                }

                //positionMilieu = window.screen.width / 2;
                //var positionSouris = event.pageX;
                //if (positionSouris > positionMilieu && positionDesYeux=="centre"){
                //    regarderVersLaDroite();
                //    positionDesYeux = "droite";
                //}
                //if (positionSouris > positionMilieu && positionDesYeux=="gauche"){
                //    regarderVersLaDroite();
                //    positionDesYeux = "centre";
                //}
                //if (positionSouris < positionMilieu && positionDesYeux=="centre"){
                //    regarderVersLaGauche();
                //    positionDesYeux = "gauche";
                //}
                //if (positionSouris < positionMilieu && positionDesYeux=="droite"){
                //    regarderVersLaGauche();
                //    positionDesYeux = "centre";
                //}


            }
        });
    }

    /**
     * Les yeux du robot se dirige vers la gauche
     */
    function regarderVersLaGauche(){
        alert("vers la gauche");
        $('#iris>img').animate({
            "left": "-=12px"
        }, 500);
        positionDesYeux = "gauche";
    };

    /**
     * Les yeux du robot se dirigent vers la droite
     */
    function regarderVersLaDroite(){
        alert("vers la droite");
        $('#iris>img').animate({
            "right": "-=12px"
        }, 500);
        positionDesYeux = "droite";
    };

    /**
     * Le robot lèvent ses yeux au ciel
     */
    function regarderVersLeBas(){
        alert("vers le bas");
        $('#iris>img').animate({
            "top": "+=8px"
        }, 500);
        //positionDesYeux = "bas";
    };


    ///**
    // * Gestion du mouvement des yeux en fonction de la position de la souris
    // */
    //$('body').mousemove(function(event) {
    //    positionMilieu = window.screen.width / 2;
    //    var positionSouris = event.pageX;
    //    if (positionSouris > positionMilieu && positionDesYeux=="centre"){
    //        regarderVersLaDroite();
    //        positionDesYeux = "droite";
    //    }
    //    if (positionSouris > positionMilieu && positionDesYeux=="gauche"){
    //        regarderVersLaDroite();
    //        positionDesYeux = "centre";
    //    }
    //    if (positionSouris < positionMilieu && positionDesYeux=="centre"){
    //        regarderVersLaGauche();
    //        positionDesYeux = "gauche";
    //    }
    //    if (positionSouris < positionMilieu && positionDesYeux=="droite"){
    //        regarderVersLaGauche();
    //        positionDesYeux = "centre";
    //    }
    //
    //});

    //$( "#imageRobott" ).animate({
    //    bottom: "+=50"
    //}, 3000, apparitionMessageDeConnexion());
    //$("#ombre").animate({
    //    height: "-=20",
    //    opacity: 0.25
    //}, { duration: 3000, queue: false });

    // Lancement de l'enchainement des animations au chargement de la page
    $(window).load(function(){
        // Le code placé ici sera déclenché
        // au chargement complet de la page.
        apparitionValty();

        //Ecouteur de l'événement onChange sur le champ identifiant
            $('body').on('change', '#identifiant', function(){
            console.log("identifiant modifié");
            //if ($)
            champIdentNotNull = true;
            if (champPassNotNull && !btnConnexionAffiched){
                afficherBoutonConnexion();
            } else {
                console.log("ident ELSE");
            }
        });

        //Ecouteur de l'événement onChange sur le champs mdp
        $('body').on('change', '#motDePasse', function(){
            console.log("mdp modifié");
            champPassNotNull = true;
            if (champIdentNotNull && !btnConnexionAffiched){
                afficherBoutonConnexion();
            } else {
                console.log("mdp ELSE");
            }
        });
    });

    function supprimerFormulaire(){
        champIdentNotNull = false;
        champPassNotNull = false;
        btnConnexionAffiched = false;
        // Récuppération du nom de l'utilisateur (avec majuscule sur la première lettre...)
        username = $('#ident').val().charAt(0).toUpperCase() + $('#ident').val().slice(1);

        $("#helloValty").css('overflow', 'hidden');
        $("#helloValty").animate({
                height: 168,
                opacity: 0
            }, 2000, function(){
                $('.flecheVerticale').remove();
                $('#identifiant').remove();
                $('#motDePasse').remove();
                $('#btnconnection').remove();
                //regarderVersLeBas();
                //$('#secondeLigne').css('padding-top', 50);
                afficherAccueil();
        });

        $('#nouveauCompte').animate({
            opacity: 0
        }, 2000, function(){
            this.remove();
        });

        //Changer le fond
        $("#container").addClass("containerSombre", 2000);
        $('body').addClass("fondSombre", 2000);

        $('title').text("Accueil");
        $('title').change();

    }

    function afficherAccueil(){
        $('#helloValty>*').remove();
        $('#helloValty').css('opacity', 1);
        //$('#helloValty').append("<div id='mes'></div>");
        $.get("static/app1/accueil/messageAccueil.html", function(data) {
            data = data.replace('XXX', username);
            //alert(data);
            $("#helloValty").replaceWith(data);
        });
        console.log("messageAccueil");

        $('#btnGaucheDiv').append('<div></div>');
        $('#btnGaucheDiv').addClass('btnInitGauche').addClass('btnDiv');

            //Masquer, charger et afficher le bouton de gauche
            $('#btnGaucheDiv>div').fadeOut(function (){
                $('#btnGaucheDiv>div').load("static/app1/accueil/btnGauche.html", function () {
                    $('#btnGaucheDiv>div>div').css('display', 'none');
                    $('#btnGaucheDiv>div').fadeIn();
                });
            });

        $('#btnDroiteDiv').append('<div></div>');
        $('#btnDroiteDiv').addClass('btnInitDroite').addClass('btnDiv');

        //Masquer, charger et afficher le bouton de droite
        $('#btnDroiteDiv>div').fadeOut(function (){
            $('#btnDroiteDiv>div').load("static/app1/accueil/btnDroite.html", function () {
                $('#btnDroiteDiv>div>div').css('display', 'none');
                $('#btnDroiteDiv>div').fadeIn(function(){
                    $.getScript('static/app1/scripts/mouvementsBouttons.js', function () {
                        //$('body').on('click', function(){
                        executeAnimations();
                        chargerScriptsMicroEtPhoto();
                        //});
                        if (!animation){
                            animerRobotVersLeHautLancement();
                        }

                    });
                });
            });
        });
    }

    function chargerScriptsMicroEtPhoto(){
        $.getScript('static/app1/scripts/afficherMicro.js');
        $.getScript('static/app1/scripts/afficherPhoto.js');
    }

    function testouille(){
        $('.container').last().append("<div id='helloValty'>blabla</div>");
    }

    function envoyerPseudoUtilisateurConnecteAuServeur(){

        var jsonp = {};
        jsonp.action = "recevoirPseudo";
        var pseudo = username.toLowerCase();
        jsonp.pseudo = pseudo;

        webSocket.send(JSON.stringify(jsonp));
    }

    function suivreLaSourisDesYeux(){
        /*$('body').on('click', function(event) {
            var x = event.pageX;
            var y = event.pageY;
            var centreoeildroit = $('#robyOeilGauche').offset();
            var centreoeilgauche = $('#robyOeilGauche').offset();
            var xdroit  = centreoeildroit.left+127;
            var ydroit = centreoeildroit.top+107;
            var xgauche = centreoeilgauche.left+69;
            var ygauche = centreoeilgauche.top+107;
            alert("position oeil droit = " + xdroit +'/'+ ydroit  + "position oeil gauche : " + xgauche +'/'+ ygauche);
            alert("X = " +x +" Y = " +y);
        });*/
        $('body').on('mousemove', function(event) {
            var centreoeildroit = $('#robyOeilGauche').offset();
            var centreoeilgauche = $('#robyOeilGauche').offset();
            var xoeildroit  = centreoeildroit.left+127;
            var yoeildroit = centreoeildroit.top+107;
            var xoeilgauche = centreoeilgauche.left+69;
            //var ygauche = centreoeilgauche.top+107;
            /*var xoeildroit = 888;
            var yoeildroit = 473;
            var xoeilgauche = 836;*/
            var rayon = 8; //15
            var rayoncarre = rayon*rayon;
            positionMilieu = window.screen.width / 2;
            var xdroit = event.pageX - xoeildroit;
            var xgauche = event.pageX - xoeilgauche;
            var signexdroit;
            if (xdroit<0){
                signexdroit = -1;
            }else{
                signexdroit = 1;
            }
            var signexgauche;
            if (xgauche<0){
                signexgauche = -1;
            }else{
                signexgauche = 1;
            }
            var y = event.pageY - yoeildroit;
            /*if (y<0){
                signey = -1;
            }else{
                signey = 1;
            }*/
            var pente = y/xdroit;
            var pentecarre = 1 + pente*pente;
            xdroit = signexdroit * Math.sqrt(rayoncarre/pentecarre);
            xgauche = signexgauche * Math.sqrt(rayoncarre/pentecarre);
            y = pente * xdroit;
            //alert("X = " +x +" Y = " +y + " pente = " +pente);

            $('#robyIrisDroit').animate({
                "left": xdroit,
                "top" : y
            }, 0);

            $('#robyIrisGauche').animate({
                "left": xgauche,
                "top" : y
            }, 0);
        });


    }

    var scale = 0.99;
    function ajusterHauteurPage(){
        if ($("body").height() > $(window).height()) {
            document.body.style.zoom="80%";
        }
    }

//});
