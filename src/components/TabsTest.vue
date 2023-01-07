<template>
	<div class="menu">	
		<div>
			<div class=tabButtons>
				<button
					:class="[tab.selected ? 'selected' : '', 'tabs']"
					v-for="(tab, index) in tabs" 
					:key="index"
					@click="$emit('select-tab', tab)">
					{{ tab.tabName }}
				</button>
			</div>
			
			<select
				v-model="dTab">
				<option value="" disabled selected>Select tab to delete</option>
				<option 
					v-for="(tab, index) in tabs"
					:key="index">
					{{ tab.tabName }}
				</option>
			</select>
			
			<button class="removeTab" @click="$emit('delete-tab', dTab)">
				Delete tab
			</button>
		</div>

		<div class="addForm">
			<h2>Add new tabs</h2>
				<form>
					<label>Tab name: </label>
					<input type="text" required v-model="tabName">
				</form>

				<button class="newTab" @click="$emit('add-tab', tabName)">
					<span class="material-symbols-outlined">
						add_box
					</span>
				</button>
		</div>

		<tab
			v-for="(tab, index) in [activeTab]" 
			:key="index"
			:tabName="tab.tabName"
			:boards="tab.boards"
			:widgets="widgets"
			@add-board-click="$emit('add-board', widget, tab.tabName)">
		</tab>
	</div>
</template>

<script>
import Tab from './Tab.vue'
export default {
	name: 'Tabs',
	props: {
		tabs: {
            type: Array,
            default: []
            },
		activeTab: {
            type: Object,
            default: {}
            },
		widgets: {
            type: Array,
            default: []
            },
	},
	components: {
		Tab
	},
	emits: ['select-tab', 'delete-tab', 'add-tab', 'add-board'],
}	
</script>

<style lang="scss" scoped>
	.menu {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		
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
		}

		.tabs {
			background-color: var(--dark-alt);
			border: 5px solid var(--dark-alt);
			padding: 0.5rem 0.5rem;
			color: var(--light);
			font-size: 1rem;
		}

		.tabs.selected {
			background-color: var(--dark-alt);
			border-bottom: 5px solid var(--primary);
			.text {
				color: var(--primary);
			}
		}
		
		.tabButtons {
			display: flex;
			flex-direction: row;
		}

		select {
			background-color: var(--light);
			border-color: var(--dark);
			border-radius: 4px;
			padding: 2px;
			margin-top: 5px;
			margin-left: 5px;
		}

		.removeTab{
			background-color: var(--light);
			border: 2px solid var(--dark);
			border-radius: 4px;
			color: var(--dark);
			font-size: 0.8rem;
			padding: 2px;
			margin-left: 5px;
		}
	}
</style>