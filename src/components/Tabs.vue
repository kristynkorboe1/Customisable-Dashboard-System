<template>
    <div class="menu">		
		<div>
			<button
				v-for="(tab, index) in tabConfigs" 
				:key="index"
				@click="activeTab = tab.config">
				{{ tab.name }}
			</button>
		</div>

		<div class="addForm">
			<h2>Add up to 8 new tabs </h2>
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
import Tab5 from '../views/Tab5.vue'
import Tab6 from '../views/Tab6.vue'
import Tab7 from '../views/Tab7.vue'
import Tab8 from '../views/Tab8.vue'
import Tab9 from '../views/Tab9.vue'
import Tab10 from '../views/Tab10.vue'

export default {
	name: "Tabs",
	components: {
		Tab1,
		Tab2,
		Tab3,
		Tab4,
		Tab5,
		Tab6,
		Tab7,
		Tab8,
		Tab9,
		Tab10
	},
	data() {
		return {
			activeTab: 'Tab1',
			tabs: [
				Tab1,
				Tab2,
				Tab3,
				Tab4,
				Tab5,
				Tab6,
				Tab7,
				Tab8,
				Tab9,
				Tab10
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
		display: flex;
		flex-direction: column;

		.tabs {
			display: flex;
			flex-direction: column;
		}

		.addForm {
			position: absolute;
			right: 0;
		}

		.newTab{
			background-color: var(--light);
			padding: 0rem 0rem;
			border: 0px;
		
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