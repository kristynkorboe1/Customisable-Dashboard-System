import { Bar } from 'vue-chartjs'

<template>
    <div
      v-if="showButtons && dataLoaded">
      <button
        v-if="!showWeek && dataLoaded"
        @click="toggleShowWeek">
        Show past week only
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
      physicalActivityDataWeek: [],
      physicalActivityData: [],
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
      this.chartDataWeek.labels = physicalActivityDataWeek.map(item => item.date)
      this.chartDataWeek.datasets[0].data = physicalActivityDataWeek.map(item => item.ex)

      const physicalActivityData = await PatientDataService.getPhysicalActivityData();
      this.chartData.labels = physicalActivityData.map(item => item.date)
      this.chartData.datasets[0].data = physicalActivityData.map(item => item.ex)
      
      this.dataLoaded = true;
    
      console.log(this.dataLoaded)
    }
    catch(err) {
      this.error = err
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