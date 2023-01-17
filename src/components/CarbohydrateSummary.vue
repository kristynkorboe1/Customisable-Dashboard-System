<template>
	<main>
		<h3>This Week's Carbohydrate Intake Summary</h3>
        <div v-if="error!=''">{{ error }}</div>

        <div class="main" v-if="dataLoaded">
            <button
                v-if="!showAverage"
                @click="this.showAverage = true">
                Show average for the week
            </button>

            <button
                v-if="showAverage"
                @click="this.showAverage = false">
                Show all data for the week
            </button>

            <div v-if="showAverage">
                <div 
			        v-if="averageCarbIntake>145"
                    class="currentRed">
                    <span>{{ averageCarbIntake }}</span>
                    <small>
                        Average carbohydrate intake this week (g)
                    </small>
                    <small>
                        Remember to keep your daily carbohydrate intake under 143g.
                    </small>
                </div>

                <div 
                    v-if="averageCarbIntake<145"
                    class="current">
                    <span>{{ averageCarbIntake }}</span>
                    <small>
                        Average carbohydrate intake this week (g)
                    </small>
                </div>

            </div>

            <div v-if="!showAverage">
                <div>
                    <button
                    v-if="!showWeek"
                    @click="this.showWeek = true">
                    Show last 7 days
                    </button>

                    <button
                    v-if="showWeek"
                    @click="this.showWeek = false">
                    Show all available carbohydrate data
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
        </div>
	</main>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import PatientDataService from '../PatientDataService';
	
    export default {
		name: 'CarbohydrateSummary',
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
                default: 300
            },
            height: {
                type: Number,
                default: 300
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
                averageCarbIntake: 0,
                dataLoaded: false,
                showWeek: true,
                showAverage: true, 
                chartDataWeek: {
                    labels: [],
                    datasets: [ { 
                    data: [],
                    label: 'Daily Carbohydrate Intake (g)',
                    } ]
                },
                chartData: {
                    labels: [],
                    datasets: [ { 
                        data: [],
                        label: 'Daily Carbohydrate Intake (g)',
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
                const carbohydrateWeek = await PatientDataService.getCarbohydrateDataWeek();
                this.chartDataWeek.labels = carbohydrateWeek.map(item => item.time.slice(0,10));
                this.chartDataWeek.datasets[0].data = carbohydrateWeek.map(item => item.carbohydrateGrams);
                
                const carbohydrate = await PatientDataService.getCarbohydrateData();
                this.chartData.labels = carbohydrate.map(item => item.time.slice(0,10));
                this.chartData.datasets[0].data = carbohydrate.map(item => item.carbohydrateGrams);

                this.averageCarbIntake = carbohydrateWeek.map(item => item.carbohydrateGrams).reduce((acc,v,i,a)=>(acc+v/a.length),0).toFixed(1);
                
                this.dataLoaded = true;
            }
            catch(err) {
                console.log(err)
                this.error = "Unable to load carbohydrate summary. Please try again"
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
	font-size: 2rem;
	text-align: center;
	margin-bottom: 2rem;
}
.current, .currentRed {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 250px;
	height: 250px;
	
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
	font-size: 2rem;
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