<!-- components/MyComponent.vue -->

<template>
  <div>
      <h1 v-if="data">{{ data.IPdata['Weekend Date'] }}</h1>
      <p v-if="pending">Loading...</p>
      <p v-if="error">Error: {{ error.message }}</p>

      <div class=topgrid style="text-align: left">
        <p>
          <span style="text-align: center">
            <h3 style="margin-bottom: .2em;">IES Service Attendance</h3>
            <h3 v-if="data" style="margin-bottom: 0;">Weekend of {{ data.IPdata['Weekend Date'] }}</h3>
          </span>
        </p>
        <p></p>
        <p></p>
        <ul>
          <li v-for="(x, key) in data.IPdata.servicedata"
            style="line-height: 2em; margin-left: 1.3em; margin-bottom: 1.5em;">{{ key }}
            <table style=" margin: 0px auto;">
              <tr v-for="(y, loc) in x" style="text-align: right; line-height: 1.2em;">
                <td> {{ loc }}: </td>
                <td style="text-align: right; padding-left: 1em;"> {{ y }}</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped>
li {
  line-height: .9em;
  margin-bottom: 20px;
}
</style>

<script setup lang="ts">
import { useFetch } from '#app'; // Nuxt composable for data fetching
const { data, pending, error } = await useFetch('/api/metricsKVIPdata'); //
</script>