<script setup>

import {reactive, watch} from "vue";

// paramètres de la requête fetch
const fetchOptions = {method: "GET"};
// url de l'API
let url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/1/livres";
// Création d'un tableau de livre réactive
let listeLivre = reactive([]);
// Définition des props pcritere et newLivre
const props = defineProps({
  pcritere: String,
  newLivre: Object,
});

// fonction de chargement des livres en fonction du critère de recherche si défini
function loadLivres(critere) {
  if(critere) {
    url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/1/livres?search=" + critere;
  } else {
    url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/1/livres";
  }
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        listeLivre.splice(0, listeLivre.length);
        listeLivre.push(...data);
      })
      .catch((err) => {
        console.log(err);
      })
}

// chargement des livres si le critère de recherche change
watch(props, (newcritere) => {
  loadLivres(newcritere.pcritere);
});

// ajout d'un livre si newLivre change
watch(() => props.newLivre, (l) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      titre: l.titre,
      qtestock: l.qtestock,
      prix: l.prix,
    }),
  };
  fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        listeLivre.splice(0, listeLivre.length);
        listeLivre.push(data);
      })
      .catch((err) => {
        console.log(err);
      });
});

// suppression d'un livre
function supprimerLivre(id) {
  const options = {
    method: "DELETE",
  };
  fetch(url + "/" + id, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadLivres();
      })
      .catch((err) => {
        console.log(err);
      });
}

// modification + de la quantité d'un livre
function augmenterQuantite(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock + 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        loadLivres();
      })
      .catch((error) => {
        console.log(error);
      });
}

// modification - de la quantité d'un livre
function diminuerQuantite(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock - 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        loadLivres();
      })
      .catch((error) => {
        console.log(error);
      });
}

// récupération d'un livre par son id
function fetchLivreById(id) {
  fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
}

loadLivres();

</script>

<template>
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Liste des livres</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <li v-for="livre in listeLivre" :key="livre.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold">{{ livre.titre }}</h3>

          <button class="bg-transparent text-red-600 hover:text-red-900 focus:outline-none"
                  @click="supprimerLivre(livre.id)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center mt-4">
          <div class="mr-4 mb-2 md:mb-0">
            <span class="text-gray-600">Quantité disponible:</span>
            <div class="flex items-center justify-center mt-2">
              <button class="bg-gray-700 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                      @click="livre.qtestock == 1 ? supprimerLivre(livre.id) : diminuerQuantite(livre)">-</button>
              <span class="mx-2">{{ livre.qtestock }}</span>
              <button class="bg-gray-700 hover:bg-emerald-700 text-white px-2 py-1 rounded-md"
                      @click="augmenterQuantite(livre)">+</button>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <span class="text-gray-600 font-bold text-xl pt-2">Prix: {{ livre.prix }}€</span>
        </div>
      </li>
    </ul>
  </div>

</template>

<style scoped>

</style>