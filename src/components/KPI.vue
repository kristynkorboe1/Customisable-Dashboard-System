<template>
  <b-container class="grid-container">
  <b-row>
  <table id='kpibar' class="table">
      <thead>
        <tr>
          <th id="AvgGText" scope="col">Average glucose [mmol/L]</th>
          <th scope="col">GMI [%]</th>
          <th scope="col">GV [%]</th>
          <th scope="col">HbA1c [%]</th>
          <th scope="col">CGM active [%]</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="AvgG">{{ AvgG }}</td>
          <td id="GMI">{{ GMI }}</td>
          <td id="GV">{{ GV }}</td>
          <td id="HbA1c">{{ HbA1c }}</td>
          <td id="CGMActive">{{ CGMActive }}</td>
        </tr>
      </tbody>
    </table>
  </b-row>
</b-container>
</template>
  
<script>
  export default {
    props: {
      startTime: {
        type: String,
        default: "2022-01-01 00:00"
      },
      endTime: {
        type: String,
        default: "2022-01-28 00:00"
      },
      userId: {
        type: Number,
        default: 1
      },
      unit:{
        type: Number,
        default: 1
      }
    },
    data(){
        return {
          AvgG: null,
          GMI: null,
          GV: null,
          HbA1c: null,
          CGMActive: null,
        }
    }, 
    async mounted() {
      this.updateData(this.userId, 'cgm', this.startTime, this.endTime)
  },
  methods: {
    async updateData(id, deviceId, startDate, endDate) { 
      this.axios 
      .get(this.$backend.getUrlKPIBetweenDates(id,deviceId,startDate,endDate)) 
      .then(res => { 
        this.AvgG = res.data[0];
        this.GMI = Math.round((3.31+0.02392*this.AvgG*18.015)*100)/100;
        //this.HbA1c = Math.round((10.929*((this.AvgG*18.015+46.7)/28.7-2.15))*100)/100;
        this.HbA1c = Math.round(((this.AvgG*18.015+46.7)/28.7)*100)/100;
        this.GV = Math.round(10000*res.data[1]/this.AvgG)/100
        this.CGMActive = 100;
        this.AvgG = Math.round(this.AvgG*this.unit*100)/100;

        if (this.unit == 1){
          document.getElementById('AvgGText').innerHTML = "Average glucose [mmol/L]";
        }
        else{
          document.getElementById('AvgGText').innerHTML = "Average glucose [mg/dL]";
        }

        if (this.AvgG>8.55*this.unit){
          document.getElementById('AvgG').style.color = "red";
        }
        else{
          document.getElementById('AvgG').style.color = "black";
        }
        if (this.GMI>7.00){
          document.getElementById('GMI').style.color = "red";
        }
        else{
          document.getElementById('GMI').style.color = "black";
        }
        if (this.GV>36.0){
          document.getElementById('GV').style.color = "red";
        }
        else{
          document.getElementById('GV').style.color = "black";
        }
        if (this.HbA1c>6.5){
          document.getElementById('HbA1c').style.color = "red";
        }
        else{
          document.getElementById('HbA1c').style.color = "black";
        }
        if (this.CGMActive<100.0){
          document.getElementById('CGMActive').style.color = "red";
        }
        else{
          document.getElementById('CGMActive').style.color = "black";
        }

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
    },
    unit(){
      this.updateData(this.userId,'cgm',this.startTime,this.endTime)
    }
  },
  }
  </script>
  <style scoped>
  th {
      font-size: 120%;
  }  
  td {
    font-size: 200%;
    /*color:rgb(26, 255, 26 ,1.0);*/
    color: "black";
  }
  #kpibar {
  text-align: center;
  width:100%;
}

  </style>