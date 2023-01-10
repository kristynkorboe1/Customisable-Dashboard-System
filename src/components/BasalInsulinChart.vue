<template>
  <apexchart 
    height="350" 
    type="line" 
    :options="options" 
    :series="showHour? seriesHour : series">
  </apexchart>

</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import json from "../Data/insulinData.json";

export default {
  name: 'BasalInsulinChart',

  components: {
    apexchart: VueApexCharts
  },

  props: {
    insulinData: [],
    showHour: false
  },
  
  data () {
      return {
        options: {
          title: {
            text: 'Basal insulin [mU/min]',
            align: 'left',
          },
          chart: {
            id: 'basal-insulin'
          },
          colors: ['#4ad2de'],
          markers: {
            size: 0,
            hover: {
              sizeOffset: 4
            }
          },
          xaxis: {
            categories: json.insulinData.map(item => item.time) 
          },
          yaxis:{
            min: 0,
            max: Math.ceil(Math.max.apply(Math, (json.insulinData.map(item => item.basal)))),
            tickAmount: Math.ceil(Math.max.apply(Math, (json.insulinData.map(item => item.basal))))
          },
          stroke: {
            show: true,
            width: 2     
          },
          dataLabels: {
            enabled: false,
            offsetX: 0,
          }
        },
        series: [{
          name: 'Basal insulin [mU/min]',
          data: json.insulinData.map(item => item.basal)
        }],
        seriesHour: [{
          name: 'Basal insulin [mU/min]',
          data: json.insulinData.map(item => item.basal).slice(-13)
        }],
      }
  }
}
</script>