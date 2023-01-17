<template>
	<main>
		<h4>Glucose Tracker</h4>

		<div 
			v-if="glucoseMeasurement>10"
			class="currentRed">
			<span>{{ glucoseMeasurement }}</span>
			<small>
				Glucose level (mmol/L).
				{{ date }}
			</small>
			<small>
				Glucose level too high. Target range is 3.9-10.0 mmol/L.
			</small>
		</div>

		<div 
			v-if="glucoseMeasurement<3.9"
			class="currentRed">
			<span>{{ glucoseMeasurement }}</span>
			<small>
				Glucose level (mmol/L).
				{{ date }}
			</small>
			<small>
				Glucose level too low. Target range is 3.9-10.0 mmol/L.
			</small>
		</div>

		<div
			v-if="glucoseMeasurement>=3.9 && glucoseMeasurement<=10"
			class="current">
			<span>{{ glucoseMeasurement }}</span>
			<small>
				Glucose level (mmol/L).
				{{ date }}
			</small>
		</div>

		<form 
			@submit.prevent="addGlucoseMeasurement(glucoseInput)">
			<input 
				type="number"
				step="0.1"
				v-model="glucoseInput" />

			<input	
				type="submit"
				value="Enter glucose measurement (mmol/L)" />
		</form>
	</main>
</template>

<script>
import PatientDataService from '../PatientDataService';
	export default {
		name: 'GlucoseTracker',

		props: {
			glucoseMeasurement: 0,
			date: ""
		},

		data() {
			return {
				glucoseInputD: this.glucoseMeasurement
			}
		},

		methods: {
			async addGlucoseMeasurement(glucoseInput) {
				this.glucoseInputD = glucoseInput

				PatientDataService.addGlucoseData(this.glucoseInputD);

				this.$emit ('update-glucose-measurement', this.glucoseInputD)
			}
		},

		emits: ['update-glucose-measurement']
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
	width: 200px;
	height: 200px;
	
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