<template>
	<main>
		<h3>Physical Activity Summary</h3>
        <div v-if="error!=''">{{ error }}</div>

        <div class="main" v-if="dataLoaded">
            <div 
                v-if="averageExercise<60"
                class="currentRed">
                <span>{{ averageExercise }}</span>
                <small>
                    Average Exercise time this week (min)
                </small>
                <small>{{ date }}</small>
                <small>
                    Remember to aim for at least 60 min of exercise daily.
                </small>
            </div>

            <div 
                v-if="averageExercise>60"
                class="current">
                <span>{{ averageExercise }}</span>
                <small>
                    Average Exercise time this week (min)
                    {{ date }}
                </small>
            </div>

        <div>
            <button
            v-if="!showWeek"
            @click="this.showWeek = true">
            Show last 7 days
            </button>

            <button
            v-if="showWeek"
            @click="this.showWeek = false">
            Show all available exercise data
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
	</main>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import PatientDataService from '../PatientDataService';
	export default {
		name: 'PhysicalActivitySummary',
        components: {Bar},
		props: {
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
                default: 200
            },
            height: {
                type: Number,
                default: 100
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
                averageExercise: 0,
                dataLoaded: false,
                showWeek: true, 
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
                const exerciseDataWeek = await PatientDataService.getPhysicalActivityDataWeek();
                this.chartDataWeek.labels = exerciseDataWeek.map(item => item.time.slice(0,10));
                this.chartDataWeek.datasets[0].data = exerciseDataWeek.map(item => item.physicalActivityMin);
                
                const exerciseData = await PatientDataService.getPhysicalActivityData();
                this.chartData.labels = exerciseData.map(item => item.time.slice(0,10));
                this.chartData.datasets[0].data = exerciseData.map(item => item.physicalActivityMin);

                this.averageExercise = exerciseDataWeek.map(item => item.physicalActivityMin).reduce((acc,v,i,a)=>(acc+v/a.length),0);
                console.log(this.averageExercise)

                this.dataLoaded = true;
                console.log(this.dataLoaded);
            }
            catch(err) {
                console.log(err)
                this.error = "Unable to load exercise summary. Please try again"
            }
        },
	}
</script>


<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	background-color: var(--light);
}
main {
	padding: 1.5rem;
}
h3 {
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 2rem;
}
.current, .currentRed {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 180px;
	height: 180px;
	
	text-align: center;
	background-color: white;
	border-radius: 999px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	margin: 0 auto 2rem;
}

.currentRed {
	border: 5px solid #9e0606;
}

.current {
	border: 5px solid #4ad2de;
}

.current span, .currentRed span {
	display: block;
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
}
.current small, .currentRed small {
	color: #888;
	font-style: italic;
}

button {
    background-color: var(--dark-alt);
    border: 2px solid var(--dark);
    border-radius: 4px;
    color: var(--primary);
    font-size: 0.8rem;
    padding: 2px;
  }
</style>