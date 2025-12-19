<!--
This example fetches latest Vue.js commits data from GitHub’s API and displays them as a list.
You can switch between the two branches.
-->

<script setup>
const url = `https://script.google.com/macros/s/AKfycbyPaSNci1MpONbNBwpsvGhXB9ImofH5lbPxWRXvIO7DijdzVBH_j7uMhd0wxRQBoSPoaQ/exec?SpServdata`
var { data: count } = await useFetch(url)
var sEvents = Object.keys(count.value)


let kidscount = accumulator("Kids") || 0
let adults = accumulator("Adults") || 0
let teens = accumulator("Teens") || 0
let totalAttendance = (kidscount + adults + teens)
let totals = {}
totals.Kids = kidscount
totals.Adults = adults
totals.Teens = teens
totals["Total Attendance"] = totalAttendance

function accumulator(min) {
  let accumulated = 0
  for (var i in sEvents) {
    let sData = Object.keys(count.value[sEvents[i]]["SServiceData"])
    for (var x in sData) {
      accumulated += count.value[sEvents[i]]["SServiceData"][sData[x]][min]
      if (sData[x].split(' ')[0] === min) {
        accumulated += count.value[sEvents[i]]["SServiceData"][sData[x]][min]
      }
    }
  }
  return (accumulated)
}

let tots = {}

for (var i in sEvents) {
  let sdata = Object.keys(count.value[sEvents[i]]["SServiceData"])
  for (var x in sdata) {
    let sdatakeys = Object.keys(count.value[sEvents[i]]["SServiceData"][sdata[x]])
    for (var k in sdatakeys) {
      let val = count.value[sEvents[i]]["SServiceData"][sdata[x]][sdatakeys[k]]
      if (typeof val === 'number') {
        tots[sdatakeys[k]] = val
      }
    }
  }
}

let totalAtt = (Object.values(tots).reduce((a, b) => a + b, 0))



</script>

<template>
  <div v-show="sEvents.length > 0">
    <hr>

    <div class=topgrid style="text-align: left; margin-top: 3em; margin-bottom: 3em;">


      <p></p>
      <!-- title section -->
      <span style="text-align: center">
        <h2>Recent Special Services</h2>
      </span>
      <!-- 
      - Special Event(s)
      -->
      <div v-for="(value, key) in count">

        <span style="text-align: center">
          <h3 style="margin-bottom: .2em;">{{ value.SServiceEvent }}</h3>
          <h3 style="margin-bottom: 0;">{{ value.SServiceDate }}</h3>
        </span>
        <p></p>
        <p></p>
        <!-- Listing Per Service attendance listing by ministry  -->
        <div>
          <ul>

            <li v-for="(value, key, index) in value.SServiceData"
              style="line-height: 2em; margin-left: 1.3em; margin-bottom: 1.5em;">
              <table style=" margin: 0px auto;">
                Service {{ index + 1 }} @ {{ value.time }}
                <tr v-for="(x, key, index) in tots" v-show="key != 'time'"
                  style="text-align: right; line-height: 1.2em;">
                  <td style="text-align: right;">{{ key }}:</td>
                  <td style="text-align: right; padding-left: 1em;">{{ x }}</td>
                </tr>
              </table>
            </li>
          </ul>

        </div>
        <!--  Totals of attendance by ministry and total attendance. -->
        <div>
          <p></p>
          <table style=" margin: 0px auto;">
            <tr style="text-align: right; line-height: 1.2em;">
              <td style="text-align: right;">
                <h3 style="margin-bottom: .2em;">Total Attendance:</h3>
              </td>
              <td style="text-align: right; padding-left: 1em;">
                {{ totalAtt }}
              </td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  line-height: .9em;
  margin-bottom: 20px;
}
</style>
