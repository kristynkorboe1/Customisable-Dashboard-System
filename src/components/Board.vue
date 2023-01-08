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
            <BarChart />
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

        <!-- <slot /> -->

    </div>
</template>

<script>
import Widget from '../components/Widget.vue'
import BarChart from '../components/BarChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'
import CarbohydrateChart from '../components/CarbohydrateChart.vue'
import GlucoseChart from '../components/GlucoseChart.vue'

export default {
    props: {
        widget: ""
    },

    components: {
        Widget, BarChart, BasalInsulinChart, BolusInsulinChart
    },

    methods: {
        drop: e => {
            const widget_id = e.dataTransfer.getData('widget_id');
            const widget = document.getElementById(widget_id);
            // this.$emit('add-widget', widget)
            widget.style.display = "block";
            e.target.appendChild(widget);
        },

        // setWidget(widgetName) {
        //     this.widget = widgetName
        //     $emit('add-widget', widgetName)
        // },
    },
    emits: ['delete-board', 'add-widget']
}
</script>

<style scoped>
    .closeButton .material-symbols-outlined {
        font-size: 2rem;
        right: 20px;
        color: var(--primary);
    }

</style>