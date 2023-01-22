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
            v-if="this.widget === 'BasalInsulinChart'"
            :name="BasalInsulinChart"
            :draggable="false">
            <BasalInsulinChart 
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

        <Widget
            v-if="this.widget === 'ExerciseTracker'"
            :name="ExerciseTracker"
            :draggable="false"
            >
            <ExerciseTracker
                @update-daily-exercise="updateDailyExercise"
                :dailyExercise="dailyExercise"
                :date="date"/>
        </Widget>

        <Widget
            v-if="this.widget === 'PhysicalActivitySummary'"
            :name="PhysicalActivitySummary"
            :draggable="false"
            >
            <PhysicalActivitySummary/>
        </Widget>

        <Widget
            v-if="this.widget === 'CarbohydrateSummary'"
            :name="CarbohydrateSummary"
            :draggable="false"
            >
            <CarbohydrateSummary/>
        </Widget>

        <Widget
            v-if="this.widget === 'GlucoseTracker'"
            :name="GlucoseTracker"
            :draggable="false"
            >
            <GlucoseTracker
                @update-glucose-measurement="updateGlucoseMeasurement"
                :glucoseMeasurement="glucoseMeasurement"
                :date="date"/>
        </Widget>

        <Widget
            v-if="this.widget === 'BolusInsulinTracker'"
            :name="BolusInsulinTracker"
            :draggable="false"
            >
            <BolusInsulinTracker
                @update-bolus-insulin="updateBolusInsulin"
                :bolusInsulin="bolusInsulin"
                :date="date"/>
        </Widget>

    </div>
</template>

<script>
import Widget from '../components/Widget.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'
import GlucoseChart from '../components/GlucoseChart.vue'
import CarbohydrateTracker from '../components/CarbohydrateTracker.vue'
import ExerciseTracker from '../components/ExerciseTracker.vue'
import PhysicalActivitySummary from '../components/PhysicalActivitySummary.vue'
import CarbohydrateSummary from '../components/CarbohydrateSummary.vue'
import GlucoseTracker from '../components/GlucoseTracker.vue'
import BolusInsulinTracker from '../components/BolusInsulinTracker.vue'
import PatientDataService from '../PatientDataService'

export default {
    props: {
        widget: "",
        parentTab: "",
        id: 0,
        width: 1120,
        height: 470,
        showDay: false,
        dailyCarbIntake: 0,
        dailyExercise: 0,
        glucoseMeasurement: 0,
        bolusInsulin: 0,
        date: new Date()
    },
    
    components: {
        Widget,
        BasalInsulinChart, 
        BolusInsulinChart,
        CarbohydrateTracker,
        GlucoseChart,
        ExerciseTracker,
        PhysicalActivitySummary,
        CarbohydrateSummary,
        GlucoseTracker,
        BolusInsulinTracker,
        PatientDataService 
    },

    methods: {
        drop(e) {
            const widget_name = e.dataTransfer.getData('widget_name');
            this.setWidget(widget_name)
        },

        async setWidget(widget){
            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)

            if(widget === "CarbohydrateTracker") {
                const carbohydrateData = await PatientDataService.getCarbohydrateData()
                const [year, month, day] = carbohydrateData[carbohydrateData.length - 1].time.slice(0,10).split('-');
                const dateFormatted  = [day, month, year].join('-');
                updatedBoard.dailyCarbIntake = carbohydrateData[carbohydrateData.length - 1].carbohydrateGrams
                updatedBoard.date = dateFormatted
                updatedBoard.widget = widget

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

            else if(widget === "ExerciseTracker") {
                const exerciseData = await PatientDataService.getPhysicalActivityData()
                const [year, month, day] = exerciseData[exerciseData.length - 1].time.slice(0,10).split('-');
                const dateFormatted  = [day, month, year].join('-');
                updatedBoard.dailyExercise = exerciseData[exerciseData.length - 1].physicalActivityMin
                updatedBoard.date = dateFormatted
                updatedBoard.widget = widget

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

            else if(widget === "GlucoseTracker") {
                const date = new Date();
                const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                    + date.getFullYear();
                updatedBoard.glucoseMeasurement = 0
                updatedBoard.date = dateFormatted
                updatedBoard.widget = widget

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

            else if(widget === "BolusInsulinTracker") {
                const date = new Date();
                const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                    + date.getFullYear();
                updatedBoard.bolusInsulin = 0
                updatedBoard.date = dateFormatted
                updatedBoard.widget = widget

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
                updatedBoard.widget = widget

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

            if(res.status !== 200) {
                alert ('Error saving new board size. Please try again.')
            }

        },

        async updateDailyCarbIntake(carbInput) {
            const dose = carbInput/10
            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.dailyCarbIntake = carbInput
            
            const date = new Date();
            const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                + date.getFullYear();
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

            if(confirm('If you don\'t have a continuous infusion running, remember to take your rapid-acting insulin 15 minutes before you eat. Dose: ' + dose + 'U. Click okay to update your daily total.')){
                res.status === 200
				? location.reload()
				: alert ('Error updating carbohydrate intake. Please try again.')
            }
        },

        async updateDailyExercise(exerciseInput) {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.dailyExercise = exerciseInput
            const date = new Date();
            const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                + date.getFullYear();
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
				: alert ('Error updating exercise time. Please try again.')
        },

        async updateGlucoseMeasurement(glucoseInput) {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.glucoseMeasurement = glucoseInput
            const date = new Date();
            const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                + date.getFullYear() + ' ' + date.getHours() +':' + date.getMinutes();
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
				: alert ('Error updating glucose level. Please try again.')
        },

        async updateBolusInsulin(bolusInput) {

            const result = await fetch('http://localhost:8080/api/patientData/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab._id
            const updatedBoards = tab.boards
            const updatedBoard = updatedBoards.find(board => board.id === this.id)
            updatedBoard.bolusInsulin = bolusInput
            const date = new Date();
            const dateFormatted = ('0' + date.getDate()).slice(-2) + '-'
                + ('0' + (date.getMonth()+1)).slice(-2) + '-'
                + date.getFullYear() + ' ' + date.getHours() +':' + date.getMinutes();
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
				: alert ('Error updating bolus insulin. Please try again.')
        }
    },

    emits: ['delete-board']
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