<template>
	<main>

		<h3>Carbohydrate Tracker</h3>

		<div class="current">
			<span>{{ carbIntakeToday.carbIntake }}</span>
			<small>Today's carbohydrate intake (g)</small>
		</div>

		<form 
			@submit.prevent="addCarbIntake">
			<input 
				type="number"
				step="0.1"
				v-model="carbInput" />

			<input	
				type="submit"
				value="Add carbohydrate intake" />
		</form>

		<div v-if="carbIntakes && carbIntakes.length > 0">

			<h4>
				Last 7 days
			</h4>

			<div class="canvas-box">
				<canvas ref="carbChartEl"></canvas>
			</div>

			<!-- <div class="carb-history">
				<h2>Carbohydrate Intake History</h2>
				<ul>
					<li v-for="carbIntake in carbIntakes">
						<span>{{ carbIntake.carbIntake }}kg</span>
						<small>
							{{ new Date(carbIntake.date).toLocaleDateString() }}
						</small>
					</li>
				</ul>
			</div> -->

		</div>

	</main>
</template>

<script setup>
import { ref, shallowRef, computed, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'

const carbIntakes = ref([])
const carbChartEl = ref(null)
const carbChart = shallowRef(null)
const carbInput = ref(null)

const carbIntakeToday = computed(() => {
	return carbIntakes.value.sort((a, b) => b.date - a.date)[0] || { carbIntake: 0 }
})

const addCarbIntake = () => {
	carbIntakes.value.push({
		carbIntake: carbInput.value,
		date: new Date().getTime()
	})
}
watch(carbIntakes, (newCarbIntakes) => {
	const cs = [...newCarbIntakes]
	if (carbChart.value) {
		carbChart.value.data.labels = cs
			.sort((a, b) => a.date - b.date)
			.map(carbIntake => new Date(carbIntake.date).toLocaleDateString() )
			.slice(-7)
		carbChart.value.data.datasets[0].data = cs
			.sort((a, b) => a.date - b.date)
			.map(carbIntake => carbIntake.carbIntake)
			.slice(-7)
		carbChart.value.update()
		return
	}
	nextTick(() => {
		carbInput.value = new Chart(carbChartEl.value.getContext('2d'), {
			type: 'line',
			data: {
				labels: cs
					.sort((a, b) => a.date - b.date)
					.map(carbIntake => new Date(carbIntake.date).toLocaleDateString()),
				datasets: [
					{
						label: 'carbIntake',
						data: cs
							.sort((a, b) => a.date - b.date)
							.map(carbIntake => carbIntake.carbIntake),
						backgroundColor: '#4ad2de',
						borderColor: '#4ad2de',
						borderWidth: 1,
						fill: true
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		})
	})
}, { deep: true })
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}
body {
	background-color: #eee;
}
main {
	padding: 1.5rem;
}
h3 {
	font-size: 2em;
	text-align: center;
	margin-bottom: 2rem;
}
h4 {
	margin-bottom: 1rem;
	color: #888;
	font-weight: 400;
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
	border: 5px solid #4ad2de;
	
	margin: 0 auto 2rem;
}
.current span {
	display: block;
	font-size: 2em;
	font-weight: bold;
	margin-bottom: 0.5rem;
}
.current small {
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
form:focus-within,
form:hover {
	border-color: var(--primary);
	border-width: 2px;
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
	padding: 0.5rem 1rem;
	color: white;
	font-size: 1rem;
	font-weight: 700;
	transition: 200ms linear;
	border-left: 3px solid transparent;
}
form input[type="submit"]:hover {
	background-color: white;
	color: var(--primary);
	border-left-color: var(--primary);
}
.canvas-box {
	width: 100%;
	max-width: 720px;
	background-color: white;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
}
.weight-history ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
.weight-history ul li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
	cursor: pointer;
}
.weight-history ul li:nth-child(even) {
	background-color: #dfdfdf;
}
.weight-history ul li:hover {
	background-color: #f8f8f8;
}
.weight-history ul li:last-of-type {
	border-bottom: none;
}
.weight-history ul li span {
	display: block;
	font-size: 1.25rem;
	font-weight: 700;
	margin-right: 1rem;
}
.weight-history ul li small {
	color: #888;
	font-style: italic;
}
</style>