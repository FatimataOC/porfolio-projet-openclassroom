// recuperation des travaux depuis api
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();
/***** MODALES *****/


// Appel du token
const authUser = localStorage.getItem("userId");
const token = localStorage.getItem("token");
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

// Fermeture au clic en dehors de la modale
window.addEventListener('click', closeModalOutside);

// Déclaration du conteneur des projets pour la modale
const modalWorksDisplay = document.querySelector(".modal_works");

function genererWorks(works) {
  //création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
  for (let i = 0; i < works.length; i++) {
  // Création d'un article et apport du contenu dynamique
  // on recupére l'élément du DOM qui accueillera les traveaux
  const sectionGallery = document.querySelector(".modal_works");
  // Attribution d'un ID
  const galleryelements = document.createElement("figure");
  const work = works[i];
  galleryelements.dataset.id = work.id;
  // Attribution d'une class
  galleryelements.setAttribute("class", "figure");
  // Ajout d'une image
  const imageElement = document.createElement("img");
  imageElement.src = work.imageUrl;
  imageElement.alt = work.title;
  // Ajout d'un sous-titre
  const subtitle = document.createElement("figcaption");
  subtitle.innerText = "éditer";
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
genererWorks(works);

// Fonction de "Suppresion" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
  // Suppression du projet via l'API en fonction de l'ID du Projet (work.id).
  const deleteResponse = await fetch("http://localhost:5678/api/works/" + workId, {
      method: "DELETE",
      headers: {
          "Authorization": "Bearer " + token
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
    
/************************************** MODALE AJOUT PHOTO *******************************************/
      
// Modale ajout de photo - Déclarations
const modalGallery = document.querySelector(".modal_gallery");
const modalAddPhoto = document.querySelector(".modal_add_photo");
const addPhotoBtn = document.querySelector(".add_photo");
const returnModalBtn = document.querySelector(".modal_return");

// Modale ajout de photo - Ouverture
addPhotoBtn.addEventListener("click", () => {
    modalGallery.classList.add("hidden");
    modalAddPhoto.classList.remove("hidden");
});

// Modale ajout de photo - Retour vers modale galerie
returnModalBtn.addEventListener("click", () => {
    modalGallery.classList.remove("hidden");
    modalAddPhoto.classList.add("hidden");
});

// Récupérer la liste déroulante
const categorySelect = document.getElementById("category-option")
// Récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(data => {
    // Parcourir les catégories et créer une option pour chaque catégorie
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.value = data[i].id;
      option.text = data[i].name;
      categorySelect.appendChild(option);
    }
  })
  .catch(error => console.error(error));

// Fonction pour montrer un preview de l'image
function showPreview(event) {
  if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("previewImg");
      preview.src = src;
      const addBoxLabel = document.getElementById("photolab");
      addBoxLabel.style.display = "none";
      const addBoxSub = document.getElementById("photosub");
      addBoxSub.style.display = "none";
  };
};

const fileInput = document.getElementById("file");
fileInput.addEventListener("change", showPreview);

// Déclaration de l'URL pour la requête fetch post
const urlAddWork = "http://localhost:5678/api/works";

// Déclaration du formulaire
const addWorkForm = document.getElementById("add");

// On écoute l'évenement lors de l'envoi du projet
addWorkForm.addEventListener("submit", (event) => {
  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", showPreview);  

    // On empêche le refresh de la page par défaut
    event.preventDefault();

    // Affichage erreur si input image vide
    if (fileInput.value === "") {
        alert("Veuillez fournir une image.");
    };

    // Déclaration des valeurs à lier à l'objet
    const addImg = document.getElementById("file").files[0];
    const addTitle = document.getElementById("title").value;
    const categorySelect = document.getElementById("category-option").value;
    console.log(addImg, addTitle, categorySelect);

    // Déclaration de l'objet à envoyer
    const formData = new FormData();
    formData.append("image", addImg);
    formData.append("title", addTitle);
    formData.append("category", categorySelect);
    console.log(formData);

    // Requête fetch méthode POST
    fetch(urlAddWork, {
        method: "POST",
        headers: { "authorization": `Bearer ${token}` },
        body: formData
    })
        // Traitement de la réponse
        .then(response => {

            if (!response.ok) {
              throw new Error("Erreur lors de l'envoi de l'image");
            }
            return response.json();
          })
        
          .catch(error => {
          console.error(error);
          });
        });     