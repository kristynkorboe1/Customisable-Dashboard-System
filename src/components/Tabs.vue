<template>
    <div class="menu">		
		<div>
			<div class=tabButtons>
				<button
					class="tabs"
					v-for="(tab, index) in tabConfigs" 
					:key="index"
					@click="activeTab = tab.config">
					{{ tab.name }}
				</button>
			</div>
			
			<select
				v-model="selectedTab">
				<option value="" disabled selected>Select tab to delete</option>
				<option 
					v-for="(tab, index) in tabOptions"
					:key="index">
					{{ tab.name }}
				</option>
			</select>
			
			<button class="removeTab" @click="deleteTab(selectedTab)">
				Delete
			</button>
		</div>

		<div class="addForm">
			<h2>Add up to 9 new tabs </h2>
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
			tabName: "",
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
				{name: 'Insulin Timeseries', config: Tab1},
			],
			tabOptions:[],
			availableTabs:
			[
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
			
		}
	},
	methods: {
		addTab(tname) { 
			if(this.tabConfigs.length>=10){
				alert("Tab limit has been reached");
			}
			else if(tname==null || tname=="" || tname==" "){
				alert("Tab name cannot be empty");
			}
			else if(tname!==null && tname!=="") {
				this.tabConfigs.push({name: tname, config: this.availableTabs[0]});
				this.tabOptions.push({name: tname, config: this.availableTabs[0]});
				this.tabName=""
				this.availableTabs.shift();
			}
		},

		deleteTab(selectedTab) { 
			let tabsPostDel = this.tabConfigs.filter(tab => tab.name !== selectedTab);
			let tab = this.tabConfigs.filter(tab => tab.name === selectedTab);
			let config = tab[0].config;
			this.availableTabs.push(config);
			console.log(this.availableTabs);
			this.tabConfigs=tabsPostDel;
			this.tabOptions=this.tabOptions.filter(tab => tab.name !== selectedTab);
			this.activeTab=Tab1
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
		
		.removeTab{
			background-color: var(--light);
			border: 2px solid var(--dark);
			border-radius: 4px;
			color: var(--dark);
			font-size: 0.8rem;
			padding: 2px;
			margin-left: 5px;
		}
		
		.tabs {
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
	}
</style>