<template>
    <div
        class="board"
        @dragover.prevent
        @drop.prevent="drop">

        <div
            class=buttons>

            <button
                class="saveSize"
                @click="setBoardSize">
                Save new board size
            </button>

            <button
                class="closeButton"
                @click="$emit('delete-board', id)">
                <span class="material-symbols-outlined">
                    close   
                </span>
            </button>

        </div>

        <Widget
            :showButton="true"
            v-if="this.widget === 'ExerciseChart'"
            :name="ExerciseChart"
            :draggable="false">
            <ExerciseChart 
                :showButtons="true"
                :showWeek="showWeek"
                @toggle-show-week="toggleShowWeek(!showWeek)"/>
        </Widget>

        <Widget
            v-if="this.widget === 'BasalInsulinChart'"
            :name="BasalInsulinChart"
            :draggable="false">
            <BasalInsulinChart 
                :insulinData="insulinData"
                :showDay="showDay"/>
        </Widget>

        <Widget
            v-if="this.widget === 'BolusInsulinChart'"
            :name="BolusInsulinChart"
            :draggable="false"
            >
            <BolusInsulinChart 
                :showDay="showDay"/>
        </Widget>

        <Widget
            v-if="this.widget === 'GlucoseChart'"
            :name="GlucoseChart"
            :draggable="false"
            >
            <GlucoseChart 
                :showDay="showDay"/>
        </Widget>

        <Widget
            v-if="this.widget === 'CarbohydrateTracker'"
            :name="CarbohydrateTracker"
            :draggable="false"
            >
            <CarbohydrateTracker
                @update-daily-carb-intake="updateDailyCarbIntake"
                :dailyCarbIntake="dailyCarbIntake"
                :date="date"/>
        </Widget>

    </div>
</template>

<script>
import Widget from '../components/Widget.vue'
import ExerciseChart from './ExerciseChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'
import GlucoseChart from '../components/GlucoseChart.vue'
import CarbohydrateTracker from '../components/CarbohydrateTracker.vue'

export default {
    props: {
        widget: "",
        parentTab: "",
        id: 0,
        width: 1120,
        height: 470,
        showWeek: false,
        showDay: false,
        insulinData: [],
        dailyCarbIntake: 0,
        date: new Date()
    },

    data() {
		return {
			newWidget: ""
		}
	},

    components: {
        Widget, 
        ExerciseChart, 
        BasalInsulinChart, 
        BolusInsulinChart,
        CarbohydrateTracker,
        GlucoseChart
    },

    methods: {
        drop(e) {
            const widget_name = e.dataTransfer.getData('widget_name');
            this.newWidget = widget_name
            this.setWidget()
        },

        async setWidget(){
            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)

            if(this.newWidget === "ExerciseChart") {
                updatedBoard.showWeek = false
                updatedBoard.widget = this.newWidget

                updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)

                const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards }),
				})

                res.status === 200
                    ? location.reload()
                    : alert ('Error adding widget. Please try again')
            }

            else if(this.newWidget === "CarbohydrateTracker") {
                const date = new Date();
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const dateFormatted  = [day, month, year].join('-');
                updatedBoard.dailyCarbIntake = 0
                updatedBoard.date = dateFormatted
                updatedBoard.widget = this.newWidget

                updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)

                const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards }),
				})

                res.status === 200
                    ? location.reload()
                    : alert ('Error adding widget. Please try again')
            }

            else {
                updatedBoard.widget = this.newWidget

                updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)

                const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards }),
				})

                res.status === 200
                    ? location.reload()
                    : alert ('Error adding widget. Please try again')
            }
        },

        async setBoardSize() {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.height = document.activeElement.parentElement.parentElement.clientHeight
            updatedBoard.width = document.activeElement.parentElement.parentElement.clientWidth

            updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)

			const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards}),
				})

            res.status === 200
				? location.reload()
				: alert ('Error saving new board size. Please try again.')
        },

        async toggleShowWeek(newValue) {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.showWeek = newValue

            updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)
            
			const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards}),
				})
        },

        async updateDailyCarbIntake(carbInput) {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.dailyCarbIntake = carbInput
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateFormatted  = [day, month, year].join('-')
            updatedBoard.date = dateFormatted

            updatedBoards.map((board) => board.id === this.id ? updatedBoard : board)
            
			const res = await fetch(`http://localhost:8080/api/patientData/tabs/${tabID}`, 
				{
					method: 'PATCH',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify({ boards: updatedBoards}),
				})
            res.status === 200
				? location.reload()
				: alert ('Error updating carbohydrate intake. Please try again.')
        }
    },

    emits: ['delete-board', 'reload-board']
}
</script>

<style scoped>
    .closeButton .material-symbols-outlined {
        font-size: 2rem;
        right: 20px;
        color: var(--primary);
    }

    .closeButton {
        position: relative;
        margin-left: 90%;
    }

    .board {
       width: v-bind(width)px;
       height: v-bind(height)px;
       background-color: var(--dark-alt);
       padding: 15px;
       overflow: auto;
       resize: both;
    }

    .saveSize {
        background-color: var(--dark-alt);
        border: 2px solid var(--dark);
        border-radius: 4px;
        color: var(--primary);
        font-size: 0.8rem;
        padding: 2px;
    }

    .buttons {
        display: flex;
    }

</style>