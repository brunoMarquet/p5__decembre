import * as moduleControl from "../module/cartControl.mjs";
let lesPrix = {};
//let total = [];
let qteTotal = 0;
let prixTotal = 0;
const innerLigne = document.getElementById("templateLigne");
const innertotal = [];
innertotal[0] = document.getElementById("totalQuantity");
innertotal[1] = document.getElementById("totalPrice");

function ecrirePanier(listeProduit, lePanier) {
  let fragmentSomme = new DocumentFragment();
  let fragmentArticle = new DocumentFragment();

  for (const [unId, ligne] of Object.entries(lePanier)) {
    const unProduct = getProdPanier(unId, listeProduit);
    const fragmentArticle = templateArticle(unProduct, ligne);

    fragmentSomme.appendChild(fragmentArticle);
  }
  modifTotal(qteTotal, formaterPrix(1, prixTotal));

  return fragmentSomme;
}
function getProdPanier(unId, lesProduits) {
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
      return lesProduits[j];
    }
  }
  return {};
}
function templateArticle(leProduit, lignes) {
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + leProduit._id;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + leProduit._id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;

  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector("#pu");
  prix.textContent = formaterPrix(leProduit.price, 1);

  const suprimer = clone.querySelector(".deleteItem");
  suprimer.addEventListener("click", function () {
    moduleControl.deleteArticle(leProduit._id);
  });
  let QteModele = 0;
  for (const [key, value] of Object.entries(lignes)) {
    QteModele += value;
  }
  const nombremodele = clone.querySelector("#qteArticles");
  nombremodele.textContent = QteModele;
  nombremodele.id = "qte_" + leProduit._id;
  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = formaterPrix(leProduit.price, QteModele);
  prixArticle.id = "prix_" + leProduit._id;
  prixArticle.value = leProduit.price;

  lesPrix[leProduit._id] = formaterPrix(leProduit.price, 1);
  //debugger;
  qteTotal += 1 * QteModele;
  prixTotal += leProduit.price * QteModele;

  const lesLignes = clone.querySelector("#lesCouleurs");
  const fragLignes = ecrireLesLignes(leProduit, lignes);
  lesLignes.appendChild(fragLignes);

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}

function ecrireLesLignes(leProduit, lignes) {
  let fragmentSom = new DocumentFragment();
  for (const [color, qty] of Object.entries(lignes)) {
    fragmentSom.appendChild(
      ecrireUneLigne(
        leProduit._id,
        leProduit.price,
        color,
        leProduit.colors[color],
        qty
      )
    );
  }

  return fragmentSom;
}
function ecrireUneLigne(unId, pu, indicecolor, color, qty) {
  let fragment1 = new DocumentFragment();
  const cloneLigne = document.importNode(innerLigne.content, true);
  const arti = cloneLigne.querySelector("article");
  arti.id = `ligne_${unId}_${indicecolor}`;

  const uneCouleur = cloneLigne.querySelector("#laCouleur");
  uneCouleur.textContent = color;
  const uneQte = cloneLigne.querySelector(".qteLigneCde");
  uneQte.textContent = qty;
  uneQte.id = `inQte_${unId}_${indicecolor}`;

  const supprimer = cloneLigne.querySelector(".supLigne");
  supprimer.addEventListener("click", function () {
    moduleControl.deleteLigne(unId, indicecolor, 0);
  });
  const btM = cloneLigne.querySelector("#btonMoins");
  btM.addEventListener("click", function () {
    moduleControl.ajouterUn(unId, indicecolor, -1);
  });
  const btP = cloneLigne.querySelector("#btonPlus");
  btP.addEventListener("click", function () {
    moduleControl.ajouterUn(unId, indicecolor, 1);
  });
  const leInput = cloneLigne.querySelector(".itemQuantity");
  leInput.value = qty;

  leInput.id = `inQty_${unId}_${indicecolor}`;
  // console.log(`${color} qtés : ${qty}`);
  leInput.addEventListener("change", function () {
    moduleControl.checkModifQty(unId, indicecolor, this.value);
  });
  const leprix2 = cloneLigne.querySelector(".monPrixColor");
  leprix2.textContent = formaterPrix(pu, qty);
  leprix2.id = `lignePrix_${unId}_${indicecolor}`;

  fragment1.appendChild(cloneLigne);
  return fragment1;
}
function modifTotal(qte, total) {
  //debugger;
  innertotal[0].innerHTML = qte;
  innertotal[1].innerHTML = total;
}

/**fonctions innerHTML appellées par la fonction :actuEcran
depuis le module Controleur !
 * -pour modif le html
 */
function razLigne(unId, color) {
  document.getElementById(`ligne_${unId}_${color}`).innerHTML = "";
}
function razArticle(id) {
  document.getElementById("article_" + id).innerHTML = "";
}

function modifArticle(id, qtArticle, prixArticle) {
  document.getElementById("qte_" + id).innerHTML = qtArticle;
  document.getElementById("prix_" + id).innerHTML = prixArticle.toFixed(2);
}
function modifLigne(id, idColor, newQty, prixLigne) {
  document.getElementById("inQte_" + id + "_" + idColor).innerHTML = newQty;
  document.getElementById("inQty_" + id + "_" + idColor).value = newQty;
  document.getElementById("lignePrix_" + id + "_" + idColor).innerHTML =
    prixLigne.toFixed(2);
}

export {
  lesPrix,
  ecrirePanier,
  razLigne,
  razArticle,
  modifArticle,
  modifLigne,
  modifTotal,
};