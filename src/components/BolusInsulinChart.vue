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
  name: 'BolusInsulinChart',

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
            text: 'Bolus insulin [U]',
            align: 'left',
          },
          chart: {
            id: 'bolus-insulin'
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
            max: Math.ceil(Math.max.apply(Math, (json.insulinData.map(item => item.bolus)))),
            tickAmount: Math.ceil(Math.max.apply(Math, (json.insulinData.map(item => item.bolus))))
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
          name: 'Bolus insulin [U]',
          data: json.insulinData.map(item => item.bolus).slice(this.slice)
        }]
      }
  }
}
</script>