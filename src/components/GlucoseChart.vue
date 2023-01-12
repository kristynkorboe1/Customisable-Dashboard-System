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
  name: 'GlucoseChart',

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
            text: 'Glucose concentration [mmol/L]',
            align: 'left',
          },
          chart: {
            id: 'glucose'
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
          name: 'Glucose concentration [mmol/L]',
          data: []
        }],
        seriesDay: [{
          name: 'Glucose concentration [mmol/L]',
          data: []
        }],
      }
  },

  async created() {
    try {
      const glucoseData = await PatientDataService.getglucoseData();
      const glucoseDataDay = await PatientDataService.getglucoseDataDay();
      this.options.xaxis.categories = glucoseData.map(item => item.time);
      this.series[0].data = glucoseData.map(item => item.glucoseMeasurement);
      this.seriesDay[0].data = glucoseDataDay.map(item => item.glucoseMeasurement);

      this.dataLoaded = true;
    }
    catch(err) {
      this.error = "Unable to fetch glucose data. Please try again"
    }
  },
}
</script>