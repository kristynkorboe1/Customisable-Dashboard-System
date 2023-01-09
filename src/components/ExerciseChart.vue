import { Bar } from 'vue-chartjs'

<template>
  <div
    v-if="this.showButtons === true">
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

    <!-- <button
      @click="toggleShowAverage"
      >
      Show average for the week
    </button> -->
  </div>

  <Bar
    v-if="showWeek && showGraphs"
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
    v-if="!showWeek && showGraphs"
    :exerciseData="exerciseData"
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

  <h1
    v-if="showAverage" >
    <span>You average exercise time in minutes is... {{average}} for the week</span>
  </h1>

</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const showWeek = false

export default {
  name: 'ExerciseChart',

  components: { 
    Bar
  },

  props: {
    exerciseData: {
      type: Array,
      default: [1]
    },
    // average: {
    //   type: Number,
    //   default: this.exerciseData.slice(-7).average
    // },
    showButtons: {
      type: Boolean,
      default: false
    },
    showAverage: {
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
      showGraphs: true,
      // showAverage: false,
      // average:this.exerciseData.map(item => item.ex).slice(-7).average,
      chartDataWeek: {
        labels: this.exerciseData.map(item => item.date).slice(-7),
        datasets: [ { 
          data: this.exerciseData.map(item => item.ex).slice(-7),
          label: 'Daily Exercise Time (min)',
        } ]
      },
      chartDataAll: {
          labels: this.exerciseData.map(item => item.date),
          datasets: [ { 
            data: this.exerciseData.map(item => item.ex),
            label: 'Daily Exercise Time (min)',
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
      // this.showAverage = false
      this.showGraphs = true
      this.showWeek = !this.showWeek
      console.log(this.chartDataWeek)
    },
    toggleShowAverage() {
      this.showGraphs = false
      // this.showAverage = true
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