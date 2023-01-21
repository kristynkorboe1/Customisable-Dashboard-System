<template>
	<main>
		<h4>Bolus Insulin Tracker</h4>

		<div
			class="current">
			<span>{{ bolusInsulin }}</span>
			<small>
				Bolus Insulin (U).
			</small>
			<small>
				{{ date }}
			</small>
		</div>

		<form 
			@submit.prevent="addBolusInsulin(bolusInput)">
			<input 
				type="number"
				step="0.1"
				v-model="bolusInput" />

			<input	
				type="submit"
				value="Enter bolus insulin (U)" />
		</form>
	</main>
</template>

<script>
import PatientDataService from '../PatientDataService';
	export default {
		name: 'BolusInsulinTracker',

		props: {
			bolusInsulin: 0,
			date: ""
		},

		methods: {
			async addBolusInsulin(bolusInput) {
				
				try{
					PatientDataService.addBolusInsulinData(bolusInput)
				}

				catch(err){
					alert("Could not store new exercise data")
				}

				this.$emit ('update-bolus-insulin', bolusInput)
			}
		},

		emits: ['update-bolus-insulin']
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
.current {
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

.current {
	border: 5px solid #4ad2de;
}

.current span{
	display: block;
	font-size: 2em;
	font-weight: bold;
	margin-bottom: 0.5rem;
}
.current small{
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