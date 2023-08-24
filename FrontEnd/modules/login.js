//recuperation du formulaire et de ses champs
const formEl = document.querySelector(".form");


//soumission du formulaire
formEl.addEventListener("submit", (event) => {
    //empêcher l'envoi du formulaire par défaut
    event.preventDefault()
    });