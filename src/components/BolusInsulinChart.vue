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
  name: 'BolusInsulinChart',

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
            categories: json.insulinData.map(item => item.time) 
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
          data: json.insulinData.map(item => item.bolus)
        }],
        seriesHour: [{
          name: 'Bolus insulin [U]',
          data: json.insulinData.map(item => item.bolus).slice(-13)
        }],
      }
  }
}
</script>