// recuperation des travaux depuis api
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();
/***** MODALES *****/

// Appel du token
const authUser = localStorage.getItem("userId");

// Modifications de l'accueil lorsque administrateur
if (authUser) {
    // Le bouton login devient logout
    const loginBtn = document.getElementById("login");
    loginBtn.innerText = "logout";
    // Masquage des filtres
    const sectionFilter = document.querySelector(".button-filter")
    sectionFilter.style.display = "none";
    // Au clic sur logout, je me déconnecte
  loginBtn.addEventListener('click', function (logout) {
    // On empêche le refresh de la page par défaut
    logout.preventDefault();
    // Effacer le contenu du localStorage
    localStorage.clear();
    // Renvoi à l'accueil
    window.location.href = "./index.html";
  });

  // Réglage de marge
  const worksTitle = document.querySelector(".works_title");
  worksTitle.classList.add("logged_margin");
  // La bannière mode édition apparait
  const banner = document.querySelector(".edit_banner");
  banner.classList.remove("hidden");
  // Le bouton modifier apparait
  const modifier = document.querySelectorAll(".div_modifier");
    modifier.forEach(element => {
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
    modal.classList.remove("hidden");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    // Le scroll de l'arrière plan est désactivé
    document.body.style.overflow = 'hidden';
  });
});

function genererWorks(works) {
  //création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
  for (let i = 0; i < works.length; i++) {
    // on recupére l'élément du DOM qui accueillera les traveaux
    const sectionGallery = document.querySelector(".modal_works");
    // Création des balises
    const galleryelements = document.createElement("figure");
    const work = works[i];
    galleryelements.dataset.id = work.id;
    // Ajout icone 'supprimer'
    galleryelements.setAttribute("class", "figure");
    // Ajout d'une image
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
     // Ajout icone 'supprimer'
     const trash = document.createElement("div");
     trash.setAttribute("class", "trash");
     trash.innerHTML = `<i class="fa-regular fa-trash-can" aria-hidden="true"></i>`;
        // Ajout des écouteurs sur les "butons corbeilles" de la "Gallerie" de la "Modale" pour pouvoir supprimer des "Projets".
        trash.addEventListener("click", function () {
            // Appel de la fonction "deleteWork" pour supprimer le projet (work.id) en fonction du bouton "Trash" cliqué.
            deleteWork(work.id);
        });
    const edit = document.createElement("figcaption");
    edit.innerText = "éditer";
    // on rattache la balise article a la section gallerie
    sectionGallery.appendChild(galleryelements);
    galleryelements.appendChild(imageElement);
    galleryelements.appendChild(edit);
    galleryelements.appendChild(trash)
  }
}
//premier affichage de la page
genererWorks(works);

// Récupération du Token d'authentification
async function deleteWork(workId) {
  // Suppression du projet via l'API en fonction de l'ID du Projet (work.id).
  const deleteResponse = await fetch("http://localhost:5678/api/works/" + workId, {
      method: "DELETE",
      headers: {
          "Authorization": "Bearer "  + authUser
      },
  });

  // Si réponse de suppression de l'API est OK, alors on supprime le projet du DOM (Gallerie et Modale).
  if (deleteResponse.ok) {
      const workToRemove = document.querySelectorAll(`figure[data-id="${workId}"]`);

      for (let i = 0; i < workToRemove.length; i++) {
          workToRemove[i].remove();
      };
      // Suppression de l'élément du tableau "works" correspondant à l'ID du projet.
      const workIndexToRemove = works.findIndex(work => workId === work.id);
      works.splice(workIndexToRemove, 1);

  } else {
      return alert("Échec de la suppression du projet");
  };
};

// Passage de la "MODALE" en mode formulaire d'ajout de projet si clique sur le bouton "Ajouter une photo" de la partie "Gallerie / suppresion de projet" de la "MODALE".
// Ajout du Listener sur le bouton "Ajouter une photo" et SWITCH de la "MODALE" si cliqué.
const addPhotoButton = document.querySelector(".add_photo");

addPhotoButton.addEventListener("click", function () {
  const sectionGallery = document.querySelector(".modal_works");
    sectionGallery.style.display = "none";
    const modalFormSwitch = document.querySelector(".modal_add_photo");
    modalFormSwitch.style.display = "flex";
});