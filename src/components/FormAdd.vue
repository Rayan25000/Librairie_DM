<script setup>
import { reactive} from "vue";

// Création d'un objet réactif avec des propriétés initiales
const livre = reactive({
  titre: "",
  qtestock: 0,
  prix: 0,
});

//fonction de réinitialisation de l'objet livre
const reset = () => {
  livre.titre = "";
  livre.qtestock = 0;
  livre.prix = 0;
};

//fonction de gestion de l'événement submit pour l'ajout d'un livre
const handlerForReset = () => {
  reset();
};

</script>

<template>
  <div >
    <div>
      <h2 class="text-xl font-bold mb-4">Ajouter un livre</h2>
      <form >
        <div class="mb-4">
          <label for="titre" class="block text-gray-700 text-sm font-bold mb-2">Titre du livre :</label>
          <input id="titre" v-model="livre.titre" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="qtestock" class="block text-gray-700 text-sm font-bold mb-2">Quantité disponible :</label>
          <input id="qtestock" v-model="livre.qtestock" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="prix" class="block text-gray-700 text-sm font-bold mb-2">Prix :</label>
          <input id="prix" v-model="livre.prix" type="number" step="0.01" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button type="submit" @click="$emit('addLivre', livre)" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Valider</button>
        <button type="button" @click="handlerForReset" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Annuler</button>
      </form>
    </div>
  </div>

</template>

<style scoped>

</style>