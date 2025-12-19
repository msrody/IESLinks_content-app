<!-- components/MyComponent.vue -->

<template>
  <div class="topgrid" style="text-align: left">
    <!-- Show a loading message while data is being fetched -->
    <p v-if="pending">Loading...</p>

    <!-- Show an error message if the fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <!-- Display the data once it has been successfully fetched -->
    <div v-if="data"><p>Showing data last updated: {{ data.LastUpdate }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for this component */
li {
  line-height: .9em;
  margin-bottom: 20px;
}
</style>

<script setup>
import { useFetch } from '#app'; // Nuxt composable for data fetching
// Fetch the data from the API endpoint
const { data, pending, error } = await useFetch('/api/metricsKVLastUpdate');

</script>
