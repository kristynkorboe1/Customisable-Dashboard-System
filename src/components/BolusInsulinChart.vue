<template>
  <div v-if="error!=''">{{ error }}</div>
  <div
    v-if="dataLoaded">
    <apexchart 
      height="350" 
      type="line" 
      :options="options" 
      :series="showDay? seriesDay : series">
    </apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import PatientDataService from '../PatientDataService'

export default {
  name: 'BolusInsulinChart',

  components: {
    apexchart: VueApexCharts
  },

  props: {
    insulinData: [],
    showDay: false
  },
  
  data () {
      return {
        error: '',
        dataLoaded: false,
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
            categories: []
          },
          stroke: {
            show: true,
            width: 1    
          },
          dataLabels: {
            enabled: false,
            offsetX: 0,
          }
        },
        series: [{
          name: 'Bolus insulin [U]',
          data: []
        }],
        seriesDay: [{
          name: 'Bolus insulin [U]',
          data: []
        }],
      }
  },

  async created() {
    try {
      const bolusInsulinData = await PatientDataService.getBolusInsulinData();
      const bolusInsulinDataDay = await PatientDataService.getBolusInsulinDataDay();
      this.options.xaxis.categories = bolusInsulinData.map(item => item.time);
      this.series[0].data = bolusInsulinData.map(item => item.bolusInsulin);
      this.seriesDay[0].data = bolusInsulinDataDay.map(item => item.bolusInsulin);

      this.dataLoaded = true;
    }
    catch(err) {
      this.error = "Unable to fetch bolus insulin data. Please try again"
    }
  },
}
</script>