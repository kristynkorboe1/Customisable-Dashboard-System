import { Bar } from 'vue-chartjs'

<template>
    <div
      v-if="showButtons">
      <button
        v-if="!showWeek"
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
      v-if="showWeek"
      :chart-options="chartOptions"
      :chart-data="chartDataWeek"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />

    <Bar
      v-if="!showWeek"
      :chart-options="chartOptions"
      :chart-data="chartDataAll"
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
import json from "../Data/BarChartData.json"
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
      showWeek: false, 
      chartDataWeek: {
        labels: json.avgDailyEx.map(item => item.date).slice(-7),
        datasets: [ { 
          data: json.avgDailyEx.map(item => item.ex).slice(-7),
          label: 'Daily Exercise Time (min)',
        } ]
      },
      chartDataAll: {
          labels: json.avgDailyEx.map(item => item.date),
          datasets: [ { 
            data: json.avgDailyEx.map(item => item.ex),
            label: 'Average Daily Exercise Time (min)',
          } ]
        },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }
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