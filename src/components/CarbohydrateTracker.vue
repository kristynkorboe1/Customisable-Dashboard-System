<template>
	<main>
		<h4>Carbohydrate Tracker</h4>

		<div 
			v-if="dailyCarbIntake>145"
			class="currentRed">
			<span>{{ dailyCarbIntake }}</span>
			<small>
				Today's carbohydrate intake (g).
				Remember to keep your daily carbohydrate intake under 143g.
			</small>
		</div>

		<div 
			v-if="dailyCarbIntake<145"
			class="current">
			<span>{{ dailyCarbIntake }}</span>
			<small>Today's carbohydrate intake (g)</small>
		</div>

		<form 
			@submit.prevent="addCarbIntake(carbInput)">
			<input 
				type="number"
				step="0.5"
				v-model="carbInput" />

			<input	
				type="submit"
				value="Add carbohydrate intake" />
		</form>

	</main>
</template>

<script>
	export default {
		name: 'CarbohydrateTracker',

		props: {
			dailyCarbIntake: 0
		},

		data() {
			return {
				carbInputD: this.dailyCarbIntake
			}
		},

		methods: {
			addCarbIntake(carbInput) {
				this.carbInputD = carbInput
				this.$emit ('update-daily-carb-intake', this.carbInputD)
			}
		},

		emits: ['update-daily-carb-intake']
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