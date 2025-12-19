<!--
This example fetches latest Vue.js commits data from GitHub’s API and displays them as a list.
You can switch between the two branches.
-->
<template>
  <div class=topgrid style="text-align: left">
    <div v-if="data">
        <p></p>
        <span style="text-align: center">
          <h3 style="margin-bottom: .2em;">IES Online Service Headcounts</h3>
          <h3 style="margin-bottom: 0;">Weekend of {{ data.OLdata["Weekend Date"] }}</h3>
        </span>
        <p></p>
        <p></p>
        <ul>
          <li v-for="(x, key) in data.OLdata.servicedata"
            style="line-height: 2em; margin-left: 1.3em; margin-bottom: 1.5em;">{{
              key }}
            <table style=" margin: 0px auto;">
              <tr v-for="(y, loc) in x" style="text-align: right; line-height: 1.2em;">
                <td> {{ loc }}: </td>
                <td style="text-align: right; padding-left: 1em;"> {{ y }}</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    <p v-if="pending">Loading...</p>
    <p v-if="error">Error: {{ error.message }}</p>
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

const { data, pending, error } = await useFetch('/api/metricsKVOLdata'); //


</script>