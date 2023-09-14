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
const sectionFilter = document.querySelector(".button-filter")
sectionFilter.classList.add("hidden");
// Réglage de marge
const worksTitle = document.querySelector(".works_title");
worksTitle.classList.add("logged_margin");
// La bannière mode édition apparait
const banner = document.querySelector(".edit_banner");
banner.classList.remove("hidden");
// Les deux boutons modifier apparaissent
const modifiers = document.querySelectorAll(".div_modifier");
modifiers.forEach(element => {
    element.classList.remove("hidden");
  });
};

/***** MODALES *****/

// Modale galerie - Déclarations
const openModalBtn = document.querySelectorAll(".modifier");
const closeModalBtn = document.querySelectorAll(".modal_close");
const modal = document.querySelector(".modal");

// Modale galerie - Ouverture
openModalBtn.forEach(function (lien) {
lien.addEventListener("click", () => {
    modal.classList.remove("hidden");  // le modale apparaît
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // Le scroll de l'arrière plan est désactivé
    document.body.style.overflow = 'hidden';
   
// Modale galerie 'récupération des projets via l'API'
// Déclaration du conteneur des projets pour la modale
const modalWorksDisplay = document.querySelector(".modal_works");
    fetch("http://localhost:5678/api/works")
   .then(response => response.json())
   .then(data=> {
      for (let i = 0;i < data.length; i++) {
       // Création d'un article et apport du contenu dynamique
       const projet = document.createElement("figure");
       // Attribution d'une class
       projet.setAttribute("class", "figure");
       // Ajout d'une image
       const image = document.createElement("img");
       image.src = data[i].imageUrl;
        // Ajout icone 'supprimer'
        const trash = document.createElement("div");
        trash.setAttribute("class", "trash");
        trash.innerHTML = `<i class="fa-regular fa-trash-can" aria-hidden="true"></i>`;
       // Ajout d'un sous-titre
       const subtitle = document.createElement("figcaption");
       subtitle.innerText = "éditer";
       // Association Enfant-Parent
       modalWorksDisplay.appendChild(projet);
       projet.appendChild(image);
       projet.appendChild(subtitle);
       projet.appendChild(trash);
      }
    })
   });
  });

// Fermeture de la croix - modale gallerie
closeModalBtn.forEach(function (lien) {
  lien.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-modal", "false");
      clearModalContent();
  });
});
  
//fermeture en dehors - Modale galerie 
function closeModalOutside(event) {
  // Si le clic est en dehors du contenu de la modale
  if (event.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-modal", "false");
      clearModalContent();
  };
};

// Fermeture au clic en dehors de la modale
window.addEventListener('click', closeModalOutside);

// masquage des filtres
