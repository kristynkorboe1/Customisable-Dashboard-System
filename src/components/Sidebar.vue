<template>
    <aside :class="`${is_expanded && 'is-expanded'}`">

        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-symbols-outlined">
                    keyboard_double_arrow_right
                </span>
            </button>
        </div>

        <h2>Widgets</h2>

        <div class="menu">

                <select 
                    v-model="filter">
                    <option filter="All" disabled selected>Filter by widget type</option>
                    <option 
                        v-for="(widgetType, index) in widgetTypes" 
                        :key="index"
                        filter="widgetType">
                        {{widgetType}}
                    </option>
                </select>

                <Widget
                    v-if="filter === 'Insulin' || filter === 'All'"
                    :id=1
                    :draggable="true"
                    :name="BasalInsulinChart">
                    <span class="material-symbols-outlined">
                        show_chart
                    </span>
                    <h4>Basal Insulin Timeseries</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Insulin' || filter === 'All'"
                    :id=2
                    :draggable="true"
                    :name="BolusInsulinChart">
                    <span class="material-symbols-outlined">
                        show_chart
                    </span>
                    <h4>Bolus Insulin Timeseries</h4>
                </Widget>

                <Widget
                v-if="filter === 'Glucose' || filter === 'All'"
                    :id=3
                    :draggable="true"
                    :name="GlucoseChart">
                    <span class="material-symbols-outlined">
                        show_chart
                    </span>
                    <h4>Glucose Timeseries</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Meals' || filter === 'All'"
                    :id=4
                    :draggable="true"
                    :name="CarbohydrateTracker">
                    <span class="material-symbols-outlined">
                        dinner_dining
                    </span>
                    <h4>Carbohydrate Tracker</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Physical Activity' || filter === 'All'"
                    :id=5
                    :draggable="true"
                    :name="ExerciseTracker">
                    <span class="material-symbols-outlined">
                        fitness_center
                    </span>
                    <h4>Physical Activity Tracker</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Physical Activity' || filter === 'All'"
                    :id=6
                    :draggable="true"
                    :name="PhysicalActivitySummary">
                    <span class="material-symbols-outlined">
                        fitness_center
                    </span>
                    <h4>Physical Activity Summary</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Meals' || filter === 'All'"
                    :id=7
                    :draggable="true"
                    :name="CarbohydrateSummary">
                    <span class="material-symbols-outlined">
                        dinner_dining
                    </span>
                    <h4>Carbohydrate Summary</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Glucose' || filter === 'All'"
                    :id=8
                    :draggable="true"
                    :name="GlucoseTracker">
                    <span class="material-symbols-outlined">
                        glucose
                    </span>
                    <h4>Glucose Tracker</h4>
                </Widget>

                <Widget
                    v-if="filter === 'Insulin' || filter === 'All'"
                    :id=9
                    :draggable="true"
                    :name="BolusInsulinTracker">
                    <span class="material-symbols-outlined">
                        vaccines
                    </span>
                    <h4>Bolus Insulin Tracker</h4>
                </Widget>

        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import Board from '../components/Board.vue'
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

const is_expanded = ref(false)

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
}
</script>

<script>
  export default {
    components: { 
        Board, 
        Widget,  
        BasalInsulinChart, 
        BolusInsulinChart, 
        CarbohydrateTracker, 
        GlucoseChart, 
        ExerciseTracker,
        PhysicalActivitySummary,
        CarbohydrateSummary,
        GlucoseTracker,
        BolusInsulinTracker
    },
    props: {
        value: {
            type: String,
            required: true,
            default: ""
        }
    },
    data() {
        return {
            widgetTypes: ["All", "Physical Activity", "Meals", "Insulin", "Glucose"],
            filter: "All"
        }
    }
  }
</script>


<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
    min-width: 5rem;
    width: 5rem;
	min-height: 100vh;
    max-height: 100vh;
    padding: 1.5rem;
	background-color: var(--dark-alt);
	color: var(--light);
	
    transition: 0.2s ease-out;
    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-out;
        .menu-toggle {
            transition: 0.2s ease-out;
            .material-symbols-outlined {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }
        
            &:hover {
                .material-symbols-outlined {
                    color: var(--primary);
                    transform: translateX(0.3rem);
                }
            }
        }
    }
    h2, .menu {
        opacity: 0;
        text-align: center;
    }
    &.is-expanded {
        width: var(--sidebar-width);
        max-height: calc(100vh - 9rem);
        overflow-y: auto;
        .menu-toggle-wrap {
            .menu-toggle {
                transform: rotate(-180deg);
            }
        }
        .board {
            padding: 0.5rem;
            padding-bottom: 4rem;
        }
        
        h2, .board {
            opacity: 1;
        }
        .widget {
            cursor: move;
            padding-top: 2rem;
        }
        .menu {
            opacity:1;
        }
    }
    .menu {
        margin: 0 -1rem;
        display: flex;
        flex-direction: column;
        .material-symbols-outlined {
                font-size: 6rem;
                color: var(--light);
                transition: 0.2s ease-out;
                cursor: pointer;
        }
    }
    select {
        background-color: var(--light);
        border-radius: 4px;
        padding: 2px;
        margin-top: 1.5rem;
    }

    .barChart {
        max-height: 70px
    }
}
</style>