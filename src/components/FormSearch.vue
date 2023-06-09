<script setup>
import { ref } from "vue";

// creation d'une variable reactive
const critere = ref("");


/* TODO: search null : msg aucun livre disponible */

</script>

<template>
      <div>
        <h2 class="text-xl font-bold mb-4">Recherche de livre</h2>
        <form @submit.prevent="$emit('search', critere)">
          <div class="mb-4">
            <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Recherche</label>
            <input id="search" v-model="critere" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <input type="submit" value="Rechercher" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        </form>
      </div>
</template>

<style scoped>

</style>