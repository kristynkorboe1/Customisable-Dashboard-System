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
  name: 'BasalInsulinChart',

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
          name: 'Basal insulin [mU/min]',
          data: []
        }],
        seriesDay: [{
          name: 'Basal insulin [mU/min]',
          data: []
        }],
      }
  },

  async created() {
    try {
      const basalInsulinData = await PatientDataService.getBasalInsulinData();
      const basalInsulinDataDay = await PatientDataService.getBasalInsulinDataDay();
      this.options.xaxis.categories = basalInsulinData.map(item => item.time.slice(0,19));
      this.series[0].data = basalInsulinData.map(item => item.basalInsulin);
      this.seriesDay[0].data = basalInsulinDataDay.map(item => item.basalInsulin);

      this.dataLoaded = true;
    }
    catch(err) {
      this.error = "Unable to fetch basal insulin data. Please try again"
    }
  },
}
</script>