<!-- components/SpecialServiceAttendance.vue -->
<template>
  <div class="topgrid" style="text-align: left; font-family: sans-serif; max-width: 600px; margin: 2rem auto; padding: 1rem;">
    <!-- Show a loading message while data is being fetched -->
    <p v-if="pending">Loading Special Service Data...</p>

    <!-- Show an error message if the fetch fails -->
    <p v-else-if="error">Error: {{ error.message }}</p>

    <!-- Display the data once it has been successfully fetched -->
    <div v-else-if="data">
      <h2 style="text-align: center; margin-bottom: 2rem;">Special Service Attendance</h2>

      <!-- Check if there is a "No Special Service" event -->
      <div v-if="data['SService 0'] && data['SService 0'].SServiceEvent.includes('No Special Service')">
        <p style="text-align: center; font-style: italic; color: #555;">{{ data['SService 0'].SServiceEvent }}</p>
      </div>

      <!-- Otherwise, display the event data and totals -->
      <div v-else>
        <!-- Outer loop for each service event (e.g., "SService 0") -->
        <div v-for="(serviceDetails, serviceKey) in data" :key="serviceKey" style="border: 1px solid #ddd; border-radius: 8px; padding: 1em; margin-bottom: 1.5em;">
          <h3 style="margin-top: 0;">{{ serviceDetails.SServiceEvent }}</h3>
          <p><strong>Date:</strong> {{ serviceDetails.SServiceDate }}</p>

          <!-- Inner loop for each time slot (e.g., "time 0") -->
          <div v-for="(timeDetails, timeKey) in serviceDetails.SServiceData" :key="timeKey" style="margin-left: 1.5em; margin-top: 1em;">
            <h4>{{ timeKey }} ({{ timeDetails.time }})</h4>
            <table style="margin-left: 1em; text-align: left;">
              <tbody>
                <!-- Loop through attendance categories (Adult, Kid, etc.) -->
                <tr v-for="(count, category) in timeDetails" :key="category">
                  <template v-if="category !== 'time'">
                    <td style="padding-right: 1em;">{{ category }}:</td>
                    <td>{{ count }}</td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Display the calculated totals -->
        <div style="margin-top: 3rem;">
          <h3 style="text-align: center;">Totals Summary</h3>
          <table style="margin: 0 auto; text-align: left; border-collapse: collapse; min-width: 250px;">
              <tbody>
                  <tr v-for="(value, key) in totals" :key="key" :style="key === 'Grand Total' ? 'border-top: 3px double #ffffff; padding-top: 0.5em; font-weight: bold;' : ''">
                      <td style="padding-right: 2em;">{{ key }}:</td>
                      <td style="text-align: right;">{{ value }}</td>
                  </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFetch } from '#app';

// Fetch data from the new API endpoint
const { data, pending, error } = await useFetch('/api/metricsKVSpServdata');

// A computed property to dynamically calculate totals from the fetched data.
const totals = computed(() => {
  // Return a default object if data is not yet loaded.
  if (!data.value) {
    return {};
  }

  const categoryTotals = {};
  let grandTotal = 0;

  // Iterate over each service (e.g., "SService 0", "SService 1")
  for (const serviceKey in data.value) {
    const service = data.value[serviceKey];
    if (service && service.SServiceData) {
      // Iterate over each time slot within the service (e.g., "time 0")
      for (const timeKey in service.SServiceData) {
        const timeSlot = service.SServiceData[timeKey];
        // Iterate over each category within the time slot (e.g., "Adult", "Kid")
        for (const category in timeSlot) {
          // We only want to sum up attendance numbers, not the 'time' field.
          if (category !== 'time') {
            const count = Number(timeSlot[category]) || 0;
            // Add to the specific category's total. Initialize if it doesn't exist.
            categoryTotals[category] = (categoryTotals[category] || 0) + count;
          }
        }
      }
    }
  }
  
  // Calculate the grand total by summing up all the category totals
  grandTotal = Object.values(categoryTotals).reduce((sum, current) => sum + current, 0);
  
  // Add the grand total to the object that will be returned
  categoryTotals['Grand Total'] = grandTotal;

  return categoryTotals;
});
</script>
