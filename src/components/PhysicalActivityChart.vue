<template>
    <Scatter
      :chart-options="options"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
      ref="scatterref"
    />
  </template>
  
  <script>
  import { Scatter } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    TimeScale,
    TimeSeriesScale,
    Filler
  } from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Filler
)
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

  export default {
    name: 'PhysicalActivityChart',
    components: { Scatter },
    props: {
      startTime: {
        type: String,
        default: "2022-01-01 00:00"
      },
      endTime: {
        type: String,
        default: "2022-01-05 00:00"
      },
      userId: {
        type: Number,
        default: 1
      },
      chartId: {
        type: String,
        default: 'physicalactivity-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 800
      },
      height: {
        type: Number,
        default: 200
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
   emits: ['weeklyExerciseEmit'],
    data() {
      return {
        ExerciseValues: [],
        weeklyExercise: 0,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
    x: {
      type: 'time',      
      adapters: { 
        date: {
          locale: enUS, 
        },
      }, 
      display: true,
      ticks: {
        major: {
          enabled: true
        },
        color: (context) => context.tick && context.tick.major && '#FF0000',
        font: {
          size: 15
        }
      }
    },
    y: {
      stacked: true,
      min: 0,
      max: 100,
      display: true,
      ticks:{
          font:{
            size: 15
          }
      },
      title: {
        display: true,
        text: 'Exercise [HRR]',
        font: {
          size: 18
        }
      }
    }
    },
        plugins: {
          legend: {
            display: true,
            labels: {
              font:{
                size: 18
              }
            }
          },
          datalabels: {
            display: false,
          },
        }
      }
      }
    },
    async mounted() {
   // this.timer = setInterval(async () => {
      this.updateData(this.userId, 'cgm', this.startTime, this.endTime)
    //}, 1000) // Every 5 min
  },
  methods: {
    async updateData(id, deviceId, startDate, endDate) { 

      this.axios 
      .get(this.$backend.getUrlPhysicalActivityBetweenDates(id, deviceId, startDate, endDate)) 
      .then(res => { 
        this.ExerciseValues.length = 0; 
        let totalExercise = 0;
        this.ExerciseValues[0] = {x: new Date(startDate), y: null}; 
        for (let i = 0; i < res.data.length; i++) { 
          this.ExerciseValues[i+1]= {x: new Date(res.data[i].time), y: res.data[i].exercise}; 
          if((this.ExerciseValues[i+1].x-this.ExerciseValues[i].x)>3000000){
            totalExercise += 1;
          }
        } 
      this.ExerciseValues[this.ExerciseValues.length] = {x: new Date(endDate), y: null}; 
      let diffTime = new Date(endDate) - new Date(startDate);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        this.weeklyExercise = Math.round((10*totalExercise/diffDays)*7)/10;
        console.log(this.weeklyExercise)
        this.$emit('weeklyExerciseEmit', this.weeklyExercise);
      }) 
    }
  },
  watch: {
    startTime() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime);
    },
    endTime() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime);
    },
    userId(){
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    }
  },
  computed: {
    chartData() {
      return {
        datasets: [
            {
              label: 'Exercise',
              data: this.ExerciseValues,
              backgroundColor: 'rgb(0,114,189,0.8)',
              borderColor: 'rgb(0,114,189,0.8)',
              borderWidth: 2,
              pointRadius: 5,
              showLine: false,
              stacked: false
            }
          ]
      }
    }
  }
  }
  </script>