exports.checkFormControl = function (user, password, req, res ) {
    if (password.length < 6) {
        return {
            error: "Mot de passe trop court"
        }
    } else if (password.length > 50) {
        return {
            error: "Mot de passe trop long"
        }
    } else if (password.search(/\d/) === -1) {
        return{
            error: "Votre mot de passe doit contenir au moins 1 chiffre",
        }
    } else if (password.search(/[A-Z]/) === -1) {
        return{
            error: "Votre mot de passe doit contenir au moins 1 majuscule",
        }
    } else {
        return "success";
    }
};
