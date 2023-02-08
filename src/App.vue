<template>
	<div class="app">
		<Sidebar />
		<div v-if="error!==''">{{ error }}</div>
		<div v-if="error===''">
			<Tabs 
				v-if="dataLoaded"
				:tabs="tabs"
				:activeTab="activeTab"
				@select-tab="selectTab"
				@delete-tab="deleteTab"
				@add-tab="addTab"
				@add-board="addBoard"
				@reload-tabs="reLoadTabs"
				/>
		</div>
	</div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Tabs from './components/Tabs.vue'

export default {
	name: 'App',
	components: {
		Sidebar,
		Tabs
	},
	data() {
		return {
			tabs: [],
			activeTab: {},
			error: '',
			dataLoaded: false
		}
	},
	methods: {
		async selectTab(selectedTab) {

			this.tabs = await this.fetchTabs()
			const pSelectedTabID = this.tabs.find((tab) => tab.tabName === this.activeTab.tabName)._id

			if(pSelectedTabID !== null) {
				this.activeTab.selected = false

				await fetch(`http://localhost:8080/api/patientData/tabs/${pSelectedTabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ selected: false }),
				})
			}
			
			this.activeTab=selectedTab
			this.activeTab.selected=true

			const selectedTabID = this.tabs.find((tab) => tab.tabName === this.activeTab.tabName)._id

			await fetch(`http://localhost:8080/api/patientData/tabs/${selectedTabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ selected: true }),
				})
			
			this.tabs = await this.fetchTabs()
		},

		async deleteTab(dTab) {

			// await this.selectTab(this.tabs[0])

			if(dTab===undefined){
				alert("Please select a tab to delete");
			}
			else if (confirm ('This action cannot be undone. Are you sure you would like to delete this tab?')){

				const tab = this.tabs.find(tab => tab.tabName === dTab)
				const id = tab._id
				
				const res = await fetch(`http://localhost:8080/api/patientData/tabs/${id}`, 
				{
					method: 'DELETE'
				})

				res.status === 204
					? (this.tab = this.tabs.filter(tab => tab.tabName !== dTab))
					: alert ('Error deleting tab. Please try again')

				this.tabs = await this.fetchTabs()
				this.activeTab.selected=false
				this.activeTab=this.tabs[0]
				this.activeTab.selected=true

			}
		},

		async addTab(tName) {
			const newTab = {
				tabName: tName,
				boards: [{"id": 1, widget: null, "height": 470, "width": 1120}],
				notes: "",
				selected: true,
				showHour: false
			}

			if (tName==null || !tName.replace(/\s/g, '').length) {
				alert("Tab name cannot be empty");
			}

			else if (this.tabs.find(tab => tab.tabName === tName)) {
				alert("Tab name needs to be unique");
			}

			else if (confirm ('Tab name cannot be changed after tab is created.')){

				const res = await fetch('http://localhost:8080/api/patientData/tabs', 
				{
					method: 'POST',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(newTab),
				})

				res.status === 201
					? this.tabs = await this.fetchTabs()
					: alert ('Error adding tab. Please try again')

				await this.selectTab(this.tabs[this.tabs.length -1])
			}

		},

		async addBoard(tName) {
			
			this.tabs = await this.fetchTabs()

			const index = this.tabs.findIndex(tab => tab.tabName === tName)
			const updatedBoards = this.tabs[index].boards

			if (updatedBoards.length === 0) {
				updatedBoards.push({ "id": 1, "widget": null, "height": 470, "width": 1120})
			}

			else {
				updatedBoards.push({ "id": updatedBoards[updatedBoards.length-1].id + 1, "widget": null, "height": 470, "width": 1120})
			}

			const tabID = this.tabs[index]._id

			const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({boards: updatedBoards}),
				})

			res.status === 200
				? location.reload()
				: alert ('Error adding board. Please try again')

			this.tabs = await this.fetchTabs()
		},

		async fetchTabs() {
			const res = await fetch('http://localhost:8080/api/patientData/tabs')
			const data = await res.json()
			return data
		},

		async fetchTab(tabName) {
			const tab = this.tabs.find(tab => tab.tabName === tabName)
			const id = tab.id

			const res = await fetch(`http://localhost:8080/api/patientData/tabs/${id}`)
			const data = await res.json()
			return data
		},
	},

	async created() {	
		try {
			this.tabs = await this.fetchTabs()
			this.activeTab = this.tabs.find((tab) => tab.selected === true)

			if(this.activeTab === undefined) {
				this.activeTab = this.tabs[0]
				this.selectTab(this.tabs[0])
			}
			this.dataLoaded=true
		}
		catch(err){
			this.error = "Unable to fetch tabs. Please try again"
		}
	},
}
</script>

<style lang="scss">
:root {
	--primary: #4ad2de;
	--dark: #1e293b;
	--dark-alt: #394d6a;
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