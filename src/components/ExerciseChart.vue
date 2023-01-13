import { Bar } from 'vue-chartjs'

<template>
    <div v-if="error!=''">{{ error }}</div>
    <div v-if="dataLoaded">
      <div
        v-if="showButtons">
        <button
          v-if="!showWeek"
          @click="toggleShowWeek">
          Show last 7 days
        </button>

        <button
          v-if="showWeek"
          @click="toggleShowWeek">
          Show all available data
        </button>
      </div>

      <Bar
        :chart-options="chartOptions"
        :chart-data="showWeek? chartDataWeek : chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </div> 
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import PatientDataService from '../PatientDataService'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ExerciseChart',
  components: { Bar },
  props: {
    showButtons: {
      type: Boolean,
      default: false
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      error: '',
      dataLoaded: false,
      showWeek: false, 
      chartDataWeek: {
        labels: [],
        datasets: [ { 
          data: [],
          label: 'Daily Exercise Time (min)',
        } ]
      },
      chartData: {
          labels: [],
          datasets: [ { 
            data: [],
            label: 'Daily Exercise Time (min)',
          } ]
        },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  
  },

  async created() {
    try {
      const physicalActivityDataWeek = await PatientDataService.getPhysicalActivityDataWeek();
      this.chartDataWeek.labels = physicalActivityDataWeek.map(item => item.time)
      this.chartDataWeek.datasets[0].data = physicalActivityDataWeek.map(item => item.physicalActivityMin)

      const physicalActivityData = await PatientDataService.getPhysicalActivityData();
      this.chartData.labels = physicalActivityData.map(item => item.time)
      this.chartData.datasets[0].data = physicalActivityData.map(item => item.physicalActivityMin)
      
      this.dataLoaded = true;
    }
    catch(err) {
      this.error = "Unable to fetch physical activity data. Please try again"
    }
  },

  methods: {
    toggleShowWeek() {
      this.showWeek = !this.showWeek
    }
  }
}
</script>

<style scoped>
  button {
    background-color: var(--dark-alt);
    border: 2px solid var(--dark);
    border-radius: 4px;
    color: var(--primary);
    font-size: 0.8rem;
    padding: 2px;
  }
  
  h1 {
    text-align: center;
    font-size: 4rem;
    color: var(--primary);
  }
</style>