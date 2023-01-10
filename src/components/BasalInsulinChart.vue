<template>
  <apexchart 
    height="300" 
    type="line" 
    :options="options" 
    :series="series">
  </apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import json from "../Data/InsulinData.json";

export default {
  name: 'BasalInsulinChart',

  components: {
    apexchart: VueApexCharts
  },

  props: {
    slice: 0
  },
  
  data () {
      return {
        options: {
          title: {
            text: 'Basal insulin [U]',
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
            categories: json.insulinData.map(item => item.time).slice(this.slice) 
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
          name: 'Basal insulin [U]',
          data: json.insulinData.map(item => item.basal).slice(this.slice)
        }]
      }
  }
}
</script>