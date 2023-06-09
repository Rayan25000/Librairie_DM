<script setup>
import {ref} from "vue";
import AffichListLibrairie from "@/components/AffichListLibrairie.vue";
import FormSearch from "@/components/FormSearch.vue";
import FormAdd from "@/components/FormAdd.vue";

// Création de deux références réactives
const motcle = ref("");
const livre = ref({});

// Définition de deux fonctions de gestion des événements
function handler(critere) {
  // Met à jour la valeur de motcle avec le critère de recherche
  motcle.value = critere;
}
function handlerAdd(l) {
  // Met à jour la valeur de livre avec l'objet livre passé en argument
  livre.value = l;
}

</script>

<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <h1 class="text-4xl font-bold text-white text-center bg-gradient-to-r from-emerald-200 via-emerald-700 to-emerald-200 p-4">Librairie 1</h1>
    <div class="grid md:grid-cols-2 gap-8">
      <FormSearch @search="handler"/>
      <FormAdd @addLivre="handlerAdd"/>
    </div>
    <AffichListLibrairie :pcritere="motcle" :newLivre="livre"/>
  </div>
</template>

<style scoped>


</style>