<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
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
  import { Chart as ChartJS2, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale  } from 'chart.js'
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  ChartJS2.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)
  
  export default {
    name: 'TIRChart',
    components: { Bar },
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
        default: 'tir-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 150
      },
      height: {
        type: Number,
        default: 300
      },
      cssClasses: {
        default: '',
        type: String
      },
      float:{
        type:String,
        default: 'right'
      },
      display: {
        type: String,
        default: ''
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
        TIRValues: [],
        type: 'bar',
        chartOptions: {
          responsive: false,
          plugins:{
            legend:{
              display:false
            },
            datalabels:{
              formatter: (value) =>{
                if (value>1.0){
                return `${value}%`;
              }
              else{
                return null;
              }
              },
              font:{
                size:18
              }
            }
          },
          scales: {
            x:{
              stacked: true,
              display: false,
            },
            y:{
              borderWidth: 0,
              stacked: true,
              display: false,
            } 
          }
        }
      }
    },
    async mounted() {
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
  },
  methods: {
    async updateData(id,deviceId,startDate,endDate) { 
      this.axios 
      .get(this.$backend.getUrlTIRBetweenDates(id,deviceId,startDate,endDate)) 
      .then(res => { 
        this.TIRValues = res.data;
      }) 
    },    
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
        labels:['Time in range'],
          datasets: [ { 
            label: 'severe hypoglycemia',
            data: [Math.round(100*this.TIRValues[4]/this.TIRValues[5])],
            backgroundColor: 'rgb(255, 26, 26 ,0.2)',
          },
          { 
            label: 'hypoglycemia',
            data: [Math.round(100*this.TIRValues[3]/this.TIRValues[5])],
            backgroundColor: 'rgb(255, 26, 26 ,0.1)',
          },
          { 
            label: 'normoglycemia',
            data: [Math.round(100*this.TIRValues[2]/this.TIRValues[5])],
            backgroundColor: 'rgb(26, 255, 26 ,0.2)',
          },
          { 
            label: 'hyperglycemia',
            data: [Math.round(100*this.TIRValues[1]/this.TIRValues[5])],
            backgroundColor: 'rgb(255, 255, 0 ,0.2)',
          },
          { 
            label: 'severe hyperglycemia',
            data: [Math.round(100*this.TIRValues[0]/this.TIRValues[5])],
            backgroundColor: 'rgb(255, 165, 0 ,0.2)',
          }
         ]
      }
    }
  }
  }
  </script>