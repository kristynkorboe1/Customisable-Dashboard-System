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

            <Board id="main-board">
                
                <select>
                    <option value="" disabled selected>Select widget to add to sidebar</option>
                    <option value="basal" @click="addWidget('basal')">Basal insulin chart</option>
                    <option value="bolus" @click="addWidget('bolus')">Bolus insulin chart</option>
                    <option value="carb" @click="addWidget('carb')">Carbohydrate chart</option>
                    <option value="glucose" @click="addWidget('glucose')">Glucose chart</option>
                    <option value="physical" @click="addWidget('physical')">Physical activity chart</option>
                </select>
            
                <!-- <widget id="widgeta" draggable="true">
                    <textarea
                        v-model="value"
                        ref="textarea"
                        rows="2"
                        @focus="resize"
                        @keyup="resize">
                    </textarea>
                </widget> -->

                <Widget id="widgetb" draggable="true">
                    <BarChart />
                </Widget>

                <Widget id="widgetc" draggable="true">
                    <BasalInsulinChart />
                </Widget>
                
                <Widget id="widgetd" draggable="true">
                    <BolusInsulinChart />
                </Widget>

                <Widget id="widgete" draggable="true">
                    <CarbohydrateChart />
                </Widget>

                <Widget id="widgetf" draggable="true">
                    <GlucoseChart />
                </Widget>

                <Widget id="widgetg" draggable="true">
                    <PhysicalActivityChart />
                </Widget>

                <Widget
                    v-if="widgets.indexOf('basal') !== -1" 
                    id="widgets.indexOf('basal')"
                    :draggable="true">
                    <BasalInsulinChart />
                </Widget>

                <Widget
                    v-if="widgets.indexOf('bolus') !== -1" 
                    :key="index"
                    id="widgets.indexOf('bolus')"
                    :draggable="true">
                    <BolusInsulinChart />
                </Widget>

                <Widget
                    v-if="widgets.indexOf('carb') !== -1" 
                    :key="index"
                    id="widgets.indexOf('carb')"
                    :draggable="true">
                    <CarbohydrateChart />
                </Widget>

                <Widget
                    v-if="widgets.indexOf('glucose') !== -1"
                    :key="index"
                    id="widgets.indexOf('glucose')"
                    :draggable="true">
                    <GlucoseChart />
                </Widget>

                <Widget
                    v-if="widgets.indexOf('physical') !== -1" 
                    :key="index"
                    id="widgets.indexOf('physical')"
                    :draggable="true">
                    <PhysicalActivityChart />
                </Widget>

            </Board>

        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import Board from '../components/Board.vue'
import Widget from '../components/Widget.vue'
import BarChart from '../components/BarChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'
import CarbohydrateChart from '../components/CarbohydrateChart.vue'
import GlucoseChart from '../components/GlucoseChart.vue'
import PhysicalActivityChart from '../components/PhysicalActivityChart.vue'
import TIRChart from '../components/TIRChart.vue'
import KPIVue from '../components/KPI.vue'
import IntervalModal from '../components/IntervalModal.vue'


const is_expanded = ref(false)

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
}
</script>

<script>
  export default {
    components: { Board, Widget, BarChart, GlucoseChart, BasalInsulinChart, BolusInsulinChart, CarbohydrateChart, PhysicalActivityChart, TIRChart, KPIVue, IntervalModal },
    props: {
      value: {
        type: String,
        required: true,
      }
    },
    data() {
		return {
			widgets: [
			] 
		}
	},
    // mounted() {
    //   this.resize();
    // },
    methods: {
    //   resize() {
    //     const { textarea } = this.$refs;
    //     textarea.style.height = textarea.scrollHeight - 4 + 'px';
    //   },
      addWidget (inpWidget){ 
            this.widgets.push(inpWidget);
		},
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

    h2, .board {
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
}
</style>