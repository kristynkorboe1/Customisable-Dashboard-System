<template>
	<main>
		<h4>exercise Tracker</h4>

		<div 
			v-if="dailyExercise<60"
			class="currentRed">
			<span>{{ dailyExercise }}</span>
			<small>
				Exercise time (min)
			</small>
            <small>{{ date }}</small>
			<small>
				Remember to aim for at least 60 min of exercise daily.
			</small>
		</div>

		<div 
			v-if="dailyExercise>60"
			class="current">
			<span>{{ dailyExercise }}</span>
			<small>
				Exercise time (min)
				{{ date }}
			</small>
		</div>

		<form 
			@submit.prevent="addExercise(exerciseInput)">
			<input 
				type="number"
				step="0.5"
				v-model="exerciseInput" />

			<input	
				type="submit"
				value="Enter today's input" />
		</form>

	</main>
</template>

<script>
import PatientDataService from '../PatientDataService';
	export default {
		name: 'ExerciseTracker',

		props: {
			dailyExercise: 0,
			date: ""
		},

		data() {
			return {
				exerciseInputD: this.dailyExercise
			}
		},

		methods: {
			async addExercise(exerciseInput) {
				this.exerciseInputD = exerciseInput
				const exerciseData = await PatientDataService.getPhysicalActivityData();
				const [year, month, day] = exerciseData[exerciseData.length - 1].time.slice(0,10).split('-');
                const dateFormatted  = [day, month, year].join('-');

				if(dateFormatted !== this.date) {
					PatientDataService.addPhysicalActivityData(exerciseInput)
				}

				else {
					PatientDataService.setPhysicalActivityDataToday(exerciseInput)
				}


				this.$emit ('update-daily-exercise', this.exerciseInputD)
			}
		},

		emits: ['update-daily-exercise']
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
h4 {
	font-size: 2rem;
	text-align: center;
	margin-bottom: 2rem;
}
.current, .currentRed {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 220px;
	height: 220px;
	
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
	font-size: 2em;
	font-weight: bold;
	margin-bottom: 0.5rem;
}
.current small, .currentRed small {
	color: #888;
	font-style: italic;
}

form {
	display: flex;
	margin-bottom: 2rem;
	border: 1px solid #AAA;
	border-radius: 0.5rem;
	overflow: hidden;
	transition: 200ms linear;
}

form input[type="number"] {
	appearance: none;
	outline: none;
	border: none;
	background-color: white;
	flex: 1 1 0%;
	padding: 1rem 1.5rem;
	font-size: 1rem;
}
form input[type="submit"] {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	background-color: var(--primary);
	padding: 0.5rem 0.5rem;
	color: var(--light);
	font-size: 1rem;
}
form input[type="submit"]:hover {
	background-color: var(--dar-alt);
	color: var(--primary);
}
</style>