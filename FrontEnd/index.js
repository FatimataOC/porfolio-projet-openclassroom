// recuperation des travaux depuis api 
const reponse = await fetch("http://localhost:5678/api/works/");
const works = await reponse.json();

function genererWorks(works) {
  // création de la boucle qui  debute a 0 a et se termine a 11 (correspond aux images de la gallerie)
  for (let i = 0; i < works.length; i++) {
        
    const article = works[i];
    // Récupération de l'élément du DOM qui accueillera les traveaux 
    const sectionGallery = document.querySelector(".gallery");
    // Création des balises 
    const worksElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.title;
    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;

    // ajouter le nom de la catégorie comme attribut de données à worksElement
    worksElement.setAttribute("data-category", article.category.name);

    // On rattache la balise article a la section Gallerie //
    sectionGallery.appendChild(worksElement); // corespond a la balise figure qui est parent des balises img et figcaption
    worksElement.appendChild(imageElement);
    worksElement.appendChild(nomElement);
  }
}
//premier affichage de la page
genererWorks(works);

const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();

function genererCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const filter = categories[i];
    // Récupération de l'élément du DOM qui accueillera les traveaux 
    const sectionFilter = document.querySelector(".button-filtre");

    // Création de la balise button 
    const buttonElement = document.createElement("button");
    buttonElement.innerText = filter.name;

    // On rattache la balise l'élément DOM a la balise Boutton
    sectionFilter.appendChild(buttonElement);
  }
}
genererCategories(categories);
