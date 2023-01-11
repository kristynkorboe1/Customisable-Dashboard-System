    <template>
    <div class="tab">

        <!-- <h2>Welcome to Your {{ tabNameP }}!</h2> -->
        <h4>You can add new dropzones below and drag in widgets from the sidebar. To move widgets back into the sidebar, scroll to the bottom and drag them below the last widget.</h4>
        <p class="desc" contenteditable="true" placeholder="Type notes here..."></p>
        
        <button class="newBoard" @click="addBoard">
            Add new dropzone
        </button>

        <main class="flexbox">
            <Board id="board1">
                <Widget id="widget1" draggable="true">
                    <BasalInsulinChart />
                </Widget>
            </Board>

            <Board id="board2">
                <Widget id="widget2" draggable="true">
                    <BolusInsulinChart />
                </Widget>
            </Board>

            <!-- <Board id="board3">
                <Widget id="widget3" draggable="true">
                    <CarbohydrateChart />
                </Widget>
            </Board>

            <Board id="board4">
                <Widget id="widget4" draggable="true">
                    <GlucoseChart />
                </Widget>
            </Board> -->

            <Board 
                v-for="(board, index) in boards"
                :key="index"
                id=index>
                <!-- <Widget 
                    id='boards[index].id'
                    draggable="true">
                    <component :is=boards[index].content>
                    </component>
                </Widget> -->
            </Board>
        </main> 
    </div>
    
</template>

<script>
import Board from '../components/Board.vue'
import Widget from '../components/Widget.vue'
import BarChart from '../components/BarChart.vue'
import BasalInsulinChart from '../components/BasalInsulinChart.vue'
import BolusInsulinChart from '../components/BolusInsulinChart.vue'
import CarbohydrateChart from '../components/CarbohydrateChart.vue'
import GlucoseChart from '../components/GlucoseChart.vue'

export default {
    name: "Tab1",
    props: {
        tabNameP: {
            type: String,
            default: 'Dashboard'
            }
    },
    components: {
        Board,
        Widget,
        GlucoseChart,
        BasalInsulinChart,
        BolusInsulinChart,
        CarbohydrateChart,
    },
    data() {
		return {
			boards: [ 
                // {id: 1, content: BasalInsulinChart},
                // {id: 2, content: BolusInsulinChart},
                // {id: 3, content: GlucoseChart},
			]
		}
	},
    methods: {
		addBoard (){ 
			this.boards.push({id: this.boards.length+1});
		},
	},
}
</script>


<style scoped>
    * {
        margin: 5px;
    }

    .flexbox {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        max-width: 1250px;
        padding: 15px;
        max-height: calc(100vh - 13rem);
        overflow-y: scroll;
    }

    .flexbox .board {
       width: 1120px;
       height: 470px;
       background-color: var(--dark-alt);
       padding: 15px;
       overflow: auto;
       resize: both;
    }

    .flexbox .board .widget {
       padding: 15px 25px;
       background-color: var(--dark-alt);
       margin-bottom: 15px;
    }

    h1, p {
        color: var(--dark);
    }

    button {
        background-color: var(--light);
        border: 2px solid var(--dark-alt);
        border-radius: 4px;
        padding: 0.3rem 0.3rem;
        color: var(--dark);
        font-size: 0.7rem;
    }

    .desc {
        width: 1200px;
        height: 40px;
        max-height: 60px;
        background: var(--light);
        word-break: break-word;
        overflow-y: scroll;
        overflow: auto;
        resize: vertical;
    }

    .desc[placeholder]:empty:before {
        content: attr(placeholder);
        color: var(--dark); 
    }

</style>
