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
            :draggable="true">
            <ExerciseChart :showButtons="true"/>
        </Widget>

        <Widget
            :showButton="true"
            v-if="this.widget === 'BasalInsulinChart'"
            :name="BasalInsulinChart"
            :draggable="true">
            <BasalInsulinChart />
        </Widget>

        <Widget
            :showButton="true"
            v-if="this.widget === 'BolusInsulinChart'"
            :name="BolusInsulinChart"
            :draggable="true"
            >
            <BolusInsulinChart />
        </Widget>

    </div>
</template>

<script>
import Widget from '../components/Widget.vue'
import ExerciseChart from './ExerciseChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'

export default {
    props: {
        widget: "",
        parentTab: "",
        id: 0,
        width: 1120,
        height: 470
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
        BolusInsulinChart
    },

    methods: {
        drop(e) {
            const widget_name = e.dataTransfer.getData('widget_name');
            this.newWidget = widget_name
            this.setWidget()
        },

        async setWidget(){
            const result = await fetch('http://localhost:5000/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab.id
            const boardIndex = tab.boards.findIndex(board => board.id === this.id)
            tab.boards[boardIndex].widget = this.newWidget

			const res = await fetch(`http://localhost:5000/tabs/${tabID}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(tab),
				})

            res.status === 200
				? alert ('Widget added sucessfully. Please refresh the page if it doesn\'t show up')
				: alert ('Error adding widget. Please try again')

            $emit('reload-board')
        },

        async setBoardSize() {

            const result = await fetch('http://localhost:5000/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.parentTab)
		    const tabID = tab.id
            const boardIndex = tab.boards.findIndex(board => board.id === this.id)
            tab.boards[boardIndex].height = document.activeElement.parentElement.parentElement.clientHeight
            tab.boards[boardIndex].width = document.activeElement.parentElement.parentElement.clientWidth

			const res = await fetch(`http://localhost:5000/tabs/${tabID}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(tab),
				})

            res.status === 200
				? alert ('Please refresh the page to store new size.')
				: alert ('Error saving new board size. Please try again.')

            $emit('reload-board')
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