<template>
    <div class="menu">
		<div class="addForm">
			<h2>Add new tab</h2>
				<form>
					<label>Tab name: </label>
					<input type="text" required v-model="tabName">
				</form>
				<button class="newTab" @click="addTab(tabName)">
					<span class="material-symbols-outlined">
						add_box
					</span>
				</button>
		</div>
		
		<button 
			v-for="(tab, index) in tabConfigs" 
			:key="index"
			@click="activeTab = tab.config">
			{{ tab.name }}
		</button>

		<keep-alive>
			<component :is="activeTab">
			</component>
		</keep-alive>
    </div>

</template>

<script>
import Tab1 from '../views/Tab1.vue'
import Tab2 from '../views/Tab2.vue'
import Tab3 from '../views/Tab3.vue'
import Tab4 from '../views/Tab4.vue'

export default {

	name: "Tabs",
	components: {
		Tab1,
		Tab2,
		Tab3,
		Tab4
	},
	data() {
		return {
			activeTab: 'Tab1',

			tabs: [
				Tab1,
				Tab2,
				Tab3,
				Tab4
			],

			tabConfigs: [
				{name: 'Glucose Board', config: Tab1},
				{name: 'Exercise Board', config: Tab2},
			]
		}
	},
	methods: {
		addTab(tname) { 
			this.tabConfigs.push({name: tname, config: this.tabs[this.tabConfigs.length]});
		},
	},
}
</script>

<style lang="scss" scoped>

	.menu {
		margin-bottom: 1.5rem;
		position: relative;

		.newTab {
			padding: 0rem 0rem;
		}

		.addForm, .newTab {
			top: 0;
			float: right;
			background-color: var(--light);
			border: 0px;
			padding: 0.1rem 0.1rem;
		
			.material-symbols-outlined {
				font-size: 2rem;
				color: var(--dark-alt);
				transition: 0.2s ease-out;
			}

			&:focus {
				background-color: var(--light);
				border-bottom: 0px;
			}
		}

		button {
            background-color: var(--dark-alt);
            border: 5px solid var(--dark-alt);
			padding: 0.5rem 0.5rem;
			color: var(--light);
			font-size: 1rem;
			
			&:hover {
				color: var(--primary);
			}
			&:focus {
				background-color: var(--dark-alt);
				border-bottom: 5px solid var(--primary);
				.text {
					color: var(--primary);
				}
			}
		}
	}
</style>