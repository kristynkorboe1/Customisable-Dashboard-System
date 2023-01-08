<template>
    <div
        class="board"
        @dragover.prevent
        @drop.prevent="drop">

        <button
            class="closeButton"
            @click="$emit('delete-board', id)">
            <span class="material-symbols-outlined">
                close   
            </span>

        </button>

        <Widget
            v-if="this.widget === 'ExerciseChart'"
            :draggable="true">
            <ExerciseChart />
        </Widget>

        <Widget
            v-if="this.widget === 'BasalInsulinChart'"
            :draggable="true">
            <BasalInsulinChart />
        </Widget>

        <Widget
            v-if="this.widget === 'BolusInsulinChart'"
            :draggable="true">
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
        id: 0
    },

    data() {
		return {
			newWidget:""
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
            console.log(tab.boards[boardIndex].widget)

			const res = await fetch(`http://localhost:5000/tabs/${tabID}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(tab),
				})

            res.status === 200
				? alert ('Widget sucessfully. Please refresh the page if it doesn\'t show up')
				: alert ('Error adding widget. Please try again')

        
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

</style>