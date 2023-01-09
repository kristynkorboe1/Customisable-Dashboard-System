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

                <Widget
                    :id=1
                    :draggable="true"
                    :name="ExerciseChart">
                    <ExerciseChart />
                </Widget>

                <Widget
                    :id=2
                    :draggable="true"
                    :name="BasalInsulinChart">
                    <BasalInsulinChart />
                </Widget>

                <Widget
                    :id=3
                    :draggable="true"
                    :name="BolusInsulinChart">
                    <BolusInsulinChart />
                </Widget>

        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import Board from '../components/Board.vue'
import Widget from '../components/Widget.vue'
import ExerciseChart from './ExerciseChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'

const is_expanded = ref(false)

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
}
</script>

<script>
  export default {
    components: { Board, Widget, ExerciseChart, BasalInsulinChart, BolusInsulinChart },
    props: {
        value: {
            type: String,
            required: true,
            default: ""
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
    }

    .barChart {
        max-height: 70px
    }
}
</style>