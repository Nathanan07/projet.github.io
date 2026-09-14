/* =========================================================================
   Brawlhalla — interactions
   ========================================================================= */

/* --- Menu de navigation (mobile) ---------------------------------------- */

(function menu() {
  const bouton = document.querySelector(".menu-bouton");
  const nav = document.querySelector(".nav");
  if (!bouton || !nav) return;

  bouton.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("ouvert");
    bouton.setAttribute("aria-expanded", String(ouvert));
  });
})();

/* --- Démo : le pourcentage de dégâts et l'éjection ----------------------- */

(function arene() {
  const scene = document.querySelector(".scene");
  if (!scene) return;

  const combattant = scene.querySelector(".combattant");
  const valeur = document.querySelector(".jauge-valeur");
  const message = document.querySelector(".arene-message");
  const frapper = document.querySelector("[data-action='frapper']");
  const rejouer = document.querySelector("[data-action='rejouer']");

  const DEPART = 14;      // position de repos, en %
  const SORTIE = 96;      // au-delà : ring out
  let degats = 0;
  let position = DEPART;
  let termine = false;

  function afficher() {
    valeur.textContent = degats;
    valeur.classList.toggle("chaud", degats >= 60 && degats < 120);
    valeur.classList.toggle("brulant", degats >= 120);
    combattant.style.left = position + "%";
  }

  function coup() {
    if (termine) return;

    degats += Math.floor(Math.random() * 9) + 8;

    // La poussée croît avec les dégâts accumulés : c'est tout le principe.
    const poussee = 3 + degats * 0.16;
    position = Math.min(position + poussee, 110);

    if (position >= SORTIE) {
      termine = true;
      combattant.style.bottom = "130px";
      combattant.style.opacity = "0";
      message.textContent = "Éjecté à " + degats + " %. Un coup de plus qu'à 0 %, mais bien plus loin.";
      message.classList.add("ko");
      frapper.disabled = true;
    } else {
      combattant.style.bottom = 48 + Math.min(degats * 0.35, 55) + "px";
      message.textContent = "Poussée de " + Math.round(poussee) + " unités. Elle augmente à chaque coup encaissé.";
    }

    afficher();
  }

  function reinitialiser() {
    degats = 0;
    position = DEPART;
    termine = false;
    combattant.style.bottom = "48px";
    combattant.style.opacity = "1";
    message.textContent = "Frappe le combattant et observe la distance parcourue.";
    message.classList.remove("ko");
    frapper.disabled = false;
    afficher();
  }

  frapper.addEventListener("click", coup);
  rejouer.addEventListener("click", reinitialiser);
  afficher();
})();

/* --- Filtre des légendes par arme --------------------------------------- */

(function filtres() {
  const boutons = document.querySelectorAll(".filtre");
  const cartes = document.querySelectorAll("[data-armes]");
  const vide = document.querySelector(".vide");
  if (!boutons.length || !cartes.length) return;

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const arme = bouton.dataset.filtre;

      boutons.forEach((b) => b.setAttribute("aria-pressed", String(b === bouton)));

      let visibles = 0;
      cartes.forEach((carte) => {
        const correspond = arme === "tout" || carte.dataset.armes.split("|").includes(arme);
        carte.hidden = !correspond;
        if (correspond) visibles++;
      });

      vide.hidden = visibles > 0;
    });
  });
})();

/* --- Formulaire de contact ---------------------------------------------- */

(function contact() {
  const form = document.querySelector(".formulaire");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const retour = form.querySelector(".retour");
    retour.textContent =
      "Message prêt à partir. Ce site est hébergé en pages statiques : branche un service de formulaire pour l'envoyer vraiment.";
  });
})();
