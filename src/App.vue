<template>
	<div class="app">
		<Sidebar />
		<div>
			<TabsTest 
				:tabs="tabs"
				:activeTab="activeTab"
				@select-tab="selectTab"
				@delete-tab="deleteTab"
				@add-tab="addTab"
				@add-board="addBoard"
				/>
			<!-- <keep-alive>
				<router-view />
			</keep-alive> -->
		</div>
	</div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import TabsTest from './components/TabsTest.vue'

export default {
	name: 'App',
	components: {
		Sidebar,
		TabsTest
	},
	data() {
		return {
			tabs: [],
			activeTab: {}
		}
	},
	methods: {
		selectTab(selectedTab) {
			this.activeTab.selected=false
			this.activeTab=selectedTab
			this.activeTab.selected=true
		},

		async deleteTab(dTab) {
			if(dTab===undefined){
				alert("Please select a tab to delete");
			}
			else if (confirm ('This action cannot be undone. Are you sure you would like to delete this tab?')){

				const tab = this.tabs.find(tab => tab.tabName === dTab)
				const id = tab.id
				
				const res = await fetch(`http://localhost:5000/tabs/${id}`, 
				{
					method: 'DELETE'
				})

				res.status === 200
					? (this.tab = this.tabs.filter(tab => tab.tabName !== dTab))
					: alert ('Error deleting tab. Please try again')


				this.tabs = this.tabs.filter((tab) => tab.tabName !== dTab)
				this.activeTab.selected=false
				this.activeTab=this.tabs[0]
				this.activeTab.selected=true
			}
		},

		async addTab(tName) {
			if (tName==null || !tName.replace(/\s/g, '').length) {
				alert("Tab name cannot be empty");
				return
			}

			if (this.tabs.find(tab => tab.tabName === tName)) {
				alert("Tab name needs to be unique");
				return
			}

			else if (confirm ('Tab name cannot be changed after tab is created.')){
				const newTab = {
					tabName: tName,
					boards: [{"id": 1}]
				}

				const res = await fetch('http://localhost:5000/tabs', 
				{
					method: 'POST',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(newTab),
				})
				const data = await res.json()
			}

			this.tabs = await this.fetchTabs()
			this.tabs[0].selected=false
			this.activeTab=this.tabs[this.tabs.length - 1]
			this.activeTab.selected=true
		},

		addBoard(tName) {
			index = this.tabs.findIndex((tab => tab.tabName === tName))
			console.log(tName)
			this.tabs[index].boards.push({id: this.tabs[index].boards.length+1})
			console.log(index)
		},

		async fetchTabs() {
			const res = await fetch('http://localhost:5000/tabs')
			const data = await res.json()
			return data
		},

		async fetchTab(tabName) {
			const tab = this.tabs.find(tab => tab.tabName === dTab)
			const id = tab.id
			const res = await fetch(`http://localhost:5000/tabs/{id}`)
			const data = await res.json()
			return data
		}
	},

	async created() {	
		this.tabs = await this.fetchTabs()
		this.activeTab = this.tabs[0];
	},
}
</script>

<style lang="scss">
:root {
	--primary: #4ad2de;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 250px;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}
body {
	background: var(--light);
}
button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
	overflow-y: hidden;
	min-height: 100vh;
    max-height: 100vh;
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
	}
}
</style>