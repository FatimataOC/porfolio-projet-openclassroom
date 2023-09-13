
// Appel à l'API pour récupérer les projets
function getTravaux() {
  return fetch("http://localhost:5678/api/works")
      .then(reponse => reponse.json())
      .then(data => {

          return data
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données :", error);
      });
};

getTravaux().then(response => {
  recupPortfolio(response)
});

function recupPortfolio(data) {
  //création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
  for (let i = 0; i < data.length; i++) {
    const article = data[i];
    // on recupére l'élément du DOM qui accueillera les traveaux
    const sectionGallery = document.querySelector(".gallery");
    // Création des balises
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    // on ajoute le nom de la catégorie comme attribut de données à worksElement
    worksElement.setAttribute("data-category", article.category.name);

    // on rattache la balise article a la section gallerie
    sectionGallery.appendChild(worksElement);
    worksElement.appendChild(imageElement);
    worksElement.appendChild(nomElement);
  }
}

// recuperation des catégories
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

function genererCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    // on sait le nombre de catégorie
    const filter = categories[i];
    // Récupération de l'élément du DOM qui accueillera les traveaux
    const sectionFilter = document.querySelector(".button-filter");

    // Création de la balise button
    const buttonElement = document.createElement("button");
    buttonElement.innerText = filter.name; // on met les noms des catégories pour chaque boutons

    // On rattache la balise l'élément DOM a la balise Boutton
    sectionFilter.appendChild(buttonElement);
  }
}
genererCategories(categories);

const buttonsCategories = document.querySelectorAll("button"); // correspond au bouton 'Tous' dans la page index
// Ajout d'un gestionnaire d'événements à chaque bouton
buttonsCategories.forEach((button) => {
  button.addEventListener("click", () => {
    // on recupére le nom de la catégorie du bouton
    const category = button.innerText;
    // Si le bouton "Tous" est cliqué
    if (category === "Tous") {
      // Sélection de tous les éléments de travail avec un attribut data-category
      const allWorkElements = document.querySelectorAll("[data-category]");
      // Affichage de tous les éléments de travail
      allWorkElements.forEach((workElement) => {
        workElement.style.display = "block";
      });
    } else {
      // sélection des éléments de travail correspondant à la catégorie du bouton
      const workElements = document.querySelectorAll(
        `[data-category="${category}"]`
      );

      // affichage des éléments de travail correspondants
      workElements.forEach((workElement) => {
        workElement.style.display = "block";
      });

      // sélection des autres éléments de travail qui ont une catégorie différente
      const otherWorkElements = document.querySelectorAll(
        `[data-category]:not([data-category="${category}"])`
      );

      // masquage des autres éléments de travail
      otherWorkElements.forEach((workElement) => {
        workElement.style.display = "none";
      });
    }
  });
});



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
        function genererWorks(works) {
          //création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
          for (let i = 0; i < works.length; i++) {
            // Création d'un article et apport du contenu dynamique
        const projet = document.createElement("figure");
        // Attribution d'une class
        projet.setAttribute("class", "figure");
        // Attribution d'un ID
        projet.setAttribute("id", data[i].id);
        // Attribution d'une catégorie
        projet.setAttribute("data-category", data[i].categoryId);
        // Ajout d'une image
        const image = document.createElement("img");
        image.src = data[i].imageUrl;
        // Ajout icone 'supprimer'
        const trash = document.createElement("div");
        trash.setAttribute("class", "trash");
        trash.innerHTML = `<i class="fa-regular fa-trash-can" aria-hidden="true"></i>`;
        // Ajout icone 'déplacer'
        const move = document.createElement("div");
        move.setAttribute("class", "move");
        move.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right" aria-hidden="true"></i>`;
        // Ajout d'un sous-titre
        const subtitle = document.createElement("figcaption");
        subtitle.innerText = "éditer";
        // Association Enfant-Parent
        modalWorksDisplay.appendChild(projet);
        projet.appendChild(image);
        projet.appendChild(subtitle);
        projet.appendChild(trash);
        projet.appendChild(move);
      }
    }
        genererWorks(works);
  });
});


