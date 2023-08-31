const formEl = document.querySelector(".form");
const error = document.querySelector('#error-message');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  // récupérer les informations de connexion du formulaire
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // envoyer les informations de connexion à l'API pour authentification
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.status === 200) {
    // récupérer le jeton d'authentification depuis la réponse de l'API
    const token = await response.json();
    console.log(token) 

    // enregistrer le jeton d'authentification dans le stockage local
    localStorage.setItem('token', token.token);
    localStorage.setItem('userId', token.userId);

    // redirige l'utilisateur vers la page d'accueil  
    window.location.href = './index.html';

  } else {
    // afficher un message d'erreur si les informations de connexion sont invalides
    error.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
  }
});