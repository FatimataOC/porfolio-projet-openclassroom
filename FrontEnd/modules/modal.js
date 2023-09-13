//*Changements lors de la conexion*//

// Appel du token
const authUser = localStorage.getItem("userId");

// Modifications de l'accueil lorsque administrateur
if (authUser) {
    // Le bouton login devient logout
    const loginBtn = document.getElementById("login");
    loginBtn.innerText = "logout";
    // Au clic sur logout, je me déconnecte
    loginBtn.addEventListener('click', function (logout) {
        // On empêche le refresh de la page par défaut
        logout.preventDefault();
        // Effacer le contenu du localStorage
        localStorage.clear();
        // Renvoi à l'accueil
        window.location.href = "./index.html";
    });

   // Masquage des filtres
   const buttonFilters = document.querySelector(".button-filter");
   buttonFilters.classList.add("hidden");
    // Réglage de marge
   const worksTitle = document.querySelector(".works_title");
   worksTitle.classList.add("logged_margin");
   // La bannière mode édition apparait
   const banner = document.querySelector(".edit_banner");
   banner.classList.remove("hidden");
   // Les deux boutons modifier apparaissent
   const modifier = document.querySelectorAll(".div_modifier");
   modifier.forEach(element => {
       element.classList.remove("hidden");
   });
}; 

//*modales*//

// Modale galerie - Déclarations
const openModalBtn = document.querySelectorAll(".modifier");
const closeModalBtn = document.querySelectorAll(".modal_close");
const modal = document.querySelector(".modal");

// Modale galerie - Ouverture
openModalBtn.forEach(function (lien) {
    lien.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        // Le scroll de l'arrière plan est désactivé
        document.body.style.overflow = 'hidden';
        // Modale galerie - Appel des travaux
  // Modale galerie - Appel des travaux
  getTravaux().then(response => {
    recupAltPortfolio(response)
});
});
});
// Vider le contenu de la modale
function clearModalContent() {
  // Supprimer le contenu HTML
  modalWorksDisplay.innerHTML = "";
  // Le scroll de l'arrière plan est ré-activé
  document.body.style.overflow = 'auto';
};

// Modale galerie - Fermeture - Croix
closeModalBtn.forEach(function (lien) {
  lien.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-modal", "false");
      clearModalContent();
  });
});

// Modale galerie - Fermeture - En dehors
function closeModalOutside(event) {
  // Si le clic est en dehors du contenu de la modale
  if (event.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-modal", "false");
      clearModalContent();
  };
};
