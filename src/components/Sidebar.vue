<template>
    <aside :class="`${is_expanded && 'is-expanded'}`">
        <!-- <div class="home-icon">
            <router-link to="/" class="button">
                <span class="material-symbols-outlined">
                    home
                </span>
            </router-link>
        </div> -->

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
                <Widget id="widget1" draggable="true">
                    <BarChart />
                </Widget>

                <Widget id="widget2" draggable="true">
                    <span class="material-symbols-outlined">
                        bar_chart
                    </span>
                </Widget>

                <Widget id="widget3" draggable="true">
                    <span class="material-symbols-outlined">
                        analytics
                    </span>
                </Widget>

                <Widget id="widget4" draggable="true">
                    <span class="material-symbols-outlined">
                        insights
                    </span>
                </Widget>

                <Widget id="widget5" draggable="true">
                    <span class="material-symbols-outlined">
                        pie_chart
                    </span>
                </Widget>

                <Widget id="widget6" draggable="true">
                    <span class="material-symbols-outlined">
                        box
                    </span>
                </Widget>

                <Widget id="widget7" draggable="true">
                    <span class="material-symbols-outlined">
                        star
                    </span>
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


const is_expanded = ref(false)

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
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
    // overflow: hidden;

	background-color: var(--dark-alt);
	color: var(--light);
	
    transition: 0.2s ease-out;


    // .home-icon {
    //     display: flex;

    //     .button {
    //         .material-symbols-outlined {
    //             font-size: 2rem;
    //             color: var(--light);
    //             position: relative;
    //         }

    //         &.router-link-exact-active {
    //             .material-symbols-outlined {
    //                 color: var(--primary);
    //             }
    //         }
    //         &:hover {
    //             .material-symbols-outlined {
    //                 color: var(--primary);
    //             }
    //         }
    //     }
    // }


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
        transition: 0.3s ease-in-out;
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

        .widget, .widget .material-symbols-outlined {
            cursor: move;
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