// recuperation des travaux depuis api
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();

function genererWorks(works) {
  //création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
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


//premier affichage de la page
genererWorks(works);

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

