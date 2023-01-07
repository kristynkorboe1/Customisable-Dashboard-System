<template>
	<div class="app">
		<Sidebar 
			:widgets="widgets"/>
		<div>
			<TabsTest 
				:tabs="tabs"
				:activeTab="activeTab"
				:widgets="widgets"
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
import WidgetVue from './components/Widget.vue'

export default {
	name: 'App',
	components: {
		Sidebar,
		TabsTest
	},
	data() {
		return {
			tabs: [],
			widgets: [],
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
				this.tabs.map((tab) => tab.selected = false)

				const newTab = {
					tabName: tName,
					boards: [{"id": 1, widgets: []}]
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
			this.activeTab=this.tabs[this.tabs.length - 1]
			this.activeTab.selected=true
		},

		async addBoard(widget, tName) {
			console.log(widget)

			this.tabs = await this.fetchTabs()

			const index = this.tabs.findIndex(tab => tab.tabName === tName)
			const updatedTab = this.tabs[index]

			if (updatedTab.boards.length === 0) {
				updatedTab.boards.push({ "id": 1, "widget": WidgetVue})
			}

			else {
				updatedTab.boards.push({ "id": updatedTab.boards[updatedTab.boards.length-1].id + 1, "widget": widget})
			}

			const id = updatedTab.id

			const res = await fetch(`http://localhost:5000/tabs/${id}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(updatedTab),
				})

			const data = await res.json()

			this.tabs = this.tabs.map((tab) => tab.id === id 
				? { ...tab, boards: data.boards}
				: tab
			)

			res.status === 200
				? alert ('Board added sucessfully. Please refresh the page if it doesn\'t show up')
				: alert ('Error adding board. Please try again')
		},

		async fetchTabs() {
			const res = await fetch('http://localhost:5000/tabs')
			const data = await res.json()
			return data
		},

		async fetchTab(tabName) {
			const tab = this.tabs.find(tab => tab.tabName === tabName)
			const id = tab.id

			const res = await fetch(`http://localhost:5000/tabs/${id}`)
			const data = await res.json()
			return data
		},

		async fetchWidgets(tabName) {
			const res = await fetch(`http://localhost:5000/widgets`)
			const data = await res.json()
			return data
        },
	},

	async created() {	
		this.tabs = await this.fetchTabs()
		this.activeTab = this.tabs[0]
		this.activeTab.selected = true
		this.widgets = await this.fetchWidgets()
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