//Instanciation du tableau d'erreurs
var errors = new Array();

//Validation
function register(data) {
    if (jQuery.isEmptyObject(errors) && $("#nom").val() !== "" && $("#postal").val() !== "" && $("#password").val() !== "" && $("#villes").val() !== "" && $("#passwordconfirm").val() !== "" && $("#prenom").val() !== "" && $("#mail").val() !== "") {
        $("#alert2").show();
        $("#alert2").html("Votre compte a été créé avec succès");
        return false;
    } else {
        $("#alert").show();
        $("#alert").html("Vous n'avez pas rempli les champs correctement.");
        return false;
    }
}

$(function () {

    //Ville
    url = "http://www.cyril-minette.net/iut/javascript/webservices/ws_json_villes_par_code_postal.php?code_postal=67320";
    $.getJSON( url, function(data){
        $.each(data, function(key, val){
            ville = val["ville_nom_reel"];
            $("#villes").append('<option value="'+ key +'">'+ ville +'</option>');
        })
    })

    //Nom
    $("#nom").keyup(function () {
        if ($(this).val() == "" || !(/^[a-z éè-]+$/gi.test($("#nom").val()))) {
            $("#nom").removeClass().addClass("form-control red");
            errors['nom'] = "Le nom est incorrect, il ne doit contenir que des lettres";
        } else {
            $("#nom").removeClass().addClass("form-control green");
            delete errors.nom;
        }
    });

    //Prénom
    $("#prenom").keyup(function () {
        if ($(this).val() == "" || !(/^[a-zéè-]+$/gi.test($("#prenom").val()))) {
            $("#prenom").removeClass().addClass("form-control red");
            errors['prenom'] = "Le prénom est incorrect, il ne doit contenir que des lettres";
        } else {
            $("#prenom").removeClass().addClass("form-control green");
            delete errors.prenom;
        }
    });

    //Civilité
    $("#selectciv").mouseout(function () {
        console.debug($("#selectciv").val());
        if ($(this).val() == "mme") {
            $("#fille").show(200, 'linear');
        } else {
            delete errors.nom2;
            $("#fille").hide(300, 'swing');
        }
    })

    //Nom Jeune Fille
    $("#nom2").keyup(function () {
        if ($("#fille").show()) {
            if ($("#nom2").val() == "" || !(/^[a-z éè-]+$/gi.test($("#nom2").val()))) {
                $("#nom2").removeClass().addClass("form-control red");
                errors['nom2'] = "Le nom de jeune fille est incorrect";
            } else{
                $("#nom2").removeClass().addClass("form-control green");
            }
        }
    });

    //Mail
    $("#mail").keyup(function () {
        if ($(this).val() == "" || !(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val()))) {
            $("#mail").removeClass().addClass("form-control red");
            errors['mail'] = "Le mail est incorrecte";
        } else {
            $("#mail").removeClass().addClass("form-control green");
            delete errors.mail;
        }
    });

    //Pseudo
    $("#pseudo").keyup(function () {
        if ($("#pseudo").val() == "" || !(/^[a-z0-9_éè-]+$/gi.test($("#pseudo").val()))) {
            $("#pseudo").removeClass().addClass("form-control red");
            errors['pseudo'] = "Le pseudo est incorrecte";
        } else {
            $("#pseudo").removeClass().addClass("form-control green");
            delete errors.pseudo;
        }
    });

    //Password
    $("#password").keyup(function () {
        if (($(this).val().length < 8)) {
            $("#password").removeClass().addClass("form-control red");
            errors['password'] = "Le mot de passe est trop court";
        } else {
            $("#password").removeClass().addClass("form-control green");
            delete errors.password;
        }
    });

    //PasswordConfirm
    $("#passwordconfirm").keyup(function () {
        if (($(this).val() !== $("#password").val()) || $("#passwordconfirm").val() == "") {
            $("#passwordconfirm").removeClass().addClass("form-control red");
            errors['passwordconfirm'] = "La confirmation du mot de passe ne correspond pas";
        } else {
            $("#passwordconfirm").removeClass().addClass("form-control green");
            delete errors.passwordconfirm;
        }
    });

    //Code Postal
    $("#postal").keyup(function () {
        if ($(this).val() == "" || !(/^[0-9]{5}$/.test($(this).val()))){
            $("#postal").removeClass().addClass("form-control red");
            errors['postal'] = "Le code postal est incorrect";
            $(".ville").hide(300, 'swing');
        } else {
            $("#postal").removeClass().addClass("form-control green");
            delete errors.postal;
            //Ville
            $("#villes").empty();
            url = "http://www.cyril-minette.net/iut/javascript/webservices/ws_json_villes_par_code_postal.php?code_postal=" + $("#postal").val();
            $.getJSON( url, function(data){
                $.each(data, function(key, val){
                    ville = val["ville_nom_reel"];
                    $("#villes").append('<option value="'+ key +'">'+ ville +'</option>');
                })
            })
            $(".ville").show(200, 'linear');
        }
    });

    //Affichage des erreurs
    $("form").on('keyup change click', function () {
        $data = "";
        for (var i in errors) {
            $data += "<li>" + errors[i] + "</li>";
        }
        var empty = new Array();
        boolean = jQuery.isEmptyObject(errors);
        $("#alert").html('');
        if (!(boolean)) {
            $("#alert").animate({"opacity": "show"}, 700);
            $("#alert").html($data);

        } else {
            $("#alert").hide("slow");
        }
    })
});