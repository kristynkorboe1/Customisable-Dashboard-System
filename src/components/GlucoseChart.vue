<template>
  <div>
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
      :display="display"
      ref="scatterref"
    />
  </div>
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
    name: 'GlucoseChart',
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
      unit: {
        type: Number,
        default: 1
      },
      chartId: {
        type: String,
        default: 'glucose-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 1000
      },
      height: {
        type: Number,
        default: 300
      },
      display: {
        type: String,
        default: 'inline-block'
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
      },
    },
    data() {
      return {
        GlucoseValues: [],
        startTimePlot: 0,
        endTimePlot: 0, 
        maxY: 23,
        ylabel: 'Glucose concentration [mmol/L]'
      }
    },
    async mounted() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime);
  },
  methods: {
    async updateData(id,deviceId,startDate,endDate) { 
      this.axios 
      .get(this.$backend.getUrlGlucoseMeasurementsBetweenDates(id,deviceId,startDate,endDate)) 
      .then(res => { 
        this.GlucoseValues.length = 0; 
        for (let i = 0; i < res.data.length; i++) { 
          this.GlucoseValues[i]= {x: new Date(res.data[i].time), y: res.data[i].measurement*this.unit}; 
        } 
        this.startTimePlot = new Date(this.GlucoseValues[0].x);
        this.startTimePlot.setSeconds(this.startTimePlot.getSeconds()-1);
        this.endTimePlot = new Date(this.GlucoseValues[res.data.length-1].x);
        this.endTimePlot.setSeconds(this.endTimePlot.getSeconds()+1);
      }
      ) 
      if(this.unit==1){
        this.ylabel = 'Glucose concentration [mmol/L]';
      }
      else{
        this.ylabel = 'Glucose concentration [mg/dL]';
      }
    },
  },
  watch: {
    startTime() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    },
    endTime() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    },
    userId(){
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    },
    unit(){
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    }
  },
  computed: {
    chartData() {
      return {
        datasets: [
            {
              label: 'Glucose measurements',
              data: this.GlucoseValues,
              backgroundColor: 'rgb(0,114,189,0.8)',
              borderColor: 'rgb(0,114,189,0.8)',
              borderWidth: 3,
              pointRadius: 0,
              showLine: true,
              stacked: false
            },
            {
              label: 'Severe hypoglycemia',
              data: [{x: this.startTimePlot, y:3*this.unit}, {x: this.endTimePlot, y:3*this.unit}],
              showLine: true,
              fill: 'start',
              backgroundColor: 'rgb(255, 26, 26 ,0.2)',
              borderColor: 'rgb(255, 26, 26 ,0.2)',
              borderWidth: 0,
              pointRadius: 0,
            },
            {
              label: 'Hypoglycemia',
              data: [{x:this.startTimePlot, y:0.9*this.unit}, {x:this.endTimePlot, y:0.9*this.unit}],
              showLine: true,
              stacked: true,
              fill: '-1',
              backgroundColor: 'rgb(255, 26, 26 ,0.1)',
              borderColor: 'rgb(255, 26, 26 ,0.1)',
              borderWidth: 0,
              pointRadius: 0
            },
            {
              label: 'Normoglycemia',
              data: [{x:this.startTimePlot, y:6.1*this.unit}, {x:this.endTimePlot, y:6.1*this.unit}],
              showLine: true,
              fill: '-1',
              backgroundColor: 'rgb(26, 255, 26 ,0.2)',
              borderColor: 'rgb(26, 255, 26 ,0.2)',
              borderWidth: 0,
              pointRadius: 0,
              stacked: true,
            },      
            {
              label: 'Hyperglycemia',
              data: [{x:this.startTimePlot, y:3.9*this.unit}, {x:this.endTimePlot, y:3.9*this.unit}],
              showLine: true,
              fill: '-1',
              backgroundColor: 'rgb(255, 255, 0 ,0.2)',
              borderColor: 'rgb(255, 255, 0 ,0.2)',
              borderWidth: 0,
              pointRadius: 0,
              stacked: true,
            },  
            {
              label: 'Severe hyperglycemia',
              data: [{x:this.startTimePlot, y:9.1*this.unit}, {x:this.endTimePlot, y:9.1*this.unit}],
              showLine: true,
              fill: '-1',
              backgroundColor: 'rgb(255, 165, 0 ,0.2)',
              borderColor: 'rgb(255, 165, 0 ,0.2)',
              borderWidth: 0,
              pointRadius: 0,
              stacked: true,
            } 
              
          ]
      }
    },
    options() {
      return{
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
      max: Math.round(this.maxY*this.unit),
      display: true,
      ticks:{
          font:{
            size: 15,
          }
      },
      title: {
        display: true,
        text: this.ylabel,
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
}
  }
  </script>