<!-- components/MyComponent.vue -->
<template>
  <div class="topgrid" style="text-align: left">
    <!-- Show a loading message while data is being fetched -->
    <p v-if="pending">Loading...</p>

    <!-- Show an error message if the fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <!-- Display the data once it has been successfully fetched -->
    <div v-if="data && data.IPdata">
      <span style="text-align: center; display: block;">
        <h3 style="margin-bottom: .2em;">IES Service Attendance</h3>
        <h3 style="margin-bottom: 0;">Weekend of {{ data.IPdata['Weekend Date'] }}</h3>
      </span>
      <p></p>
      <p></p>
      <ul>
        <li v-for="(serviceDetails, serviceName) in data.IPdata.servicedata"
          style="line-height: 2em; margin-left: 1.3em; margin-bottom: 1.5em;">
          {{ serviceName }}
          <table style="margin: 0px auto;">
            <tbody>
              <tr v-for="(count, category) in serviceDetails" style="text-align: right; line-height: 1.2em;">
                <td> {{ category }}: </td>
                <td style="text-align: right; padding-left: 1em;"> {{ count }}</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
      
      <hr>
      <br>

      <!-- Display the calculated totals -->
      <div><span style="text-align: center; display: block;">
        <h3>Weekend Totals</h3>
      </span>
        <table style="margin: 0 auto; text-align: left;">
            <tbody>
                <tr v-for="(value, key) in totals"  :style="key === 'Total Attendance' ? 'border-top: 3px double #cccccc; padding-top: 0.5em;' : ''" style="text-align: right; line-height: 1.2em;">
                    <td style="padding-right: 1em;">{{ key }}:</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>
      </div>
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
import { computed } from 'vue';
import { useFetch } from '#app'; // Nuxt composable for data fetching

// Fetch the data from the API endpoint
const { data, pending, error } = await useFetch('/api/metricsKVIPdata');

// A computed property to calculate totals from the fetched data.
// This will automatically re-calculate whenever 'data' changes.
const totals = computed(() => {
  // Return a default object if data is not yet loaded or is in an unexpected format.
  // This prevents errors in the template during the loading phase.
  if (!data.value || !data.value.IPdata || !data.value.IPdata.servicedata) {
    return {
      Adults: 0,
      Teens: 0,
      Kids: 0,
      'Total Attendance': 0
    };
  }

  // Use Object.values to get an array of service objects, then use reduce
  // to sum up the values into a single totals object.
  const calculatedTotals = Object.values(data.value.IPdata.servicedata).reduce((acc, service) => {
    // For each service, add its count to the accumulator (acc).
    // Coerce values to a Number and default to 0 if a value is missing.
    acc.Adults += Number(service.Adults) || 0;
    acc.Teens += Number(service.Teens) || 0;
    acc.Kids += Number(service.Kids) || 0;
    return acc;
  }, { Adults: 0, Teens: 0, Kids: 0 }); // Initial values for the accumulator

  // Calculate the final grand total
  calculatedTotals['Total Attendance'] = calculatedTotals.Adults + calculatedTotals.Teens + calculatedTotals.Kids;

  // Return the final calculated object
  return calculatedTotals;
});
</script>
