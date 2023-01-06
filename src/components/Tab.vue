    <template>
    <div class="tab">

        <h2>{{ tabName }}</h2>
        <button class="newBoard" @click="$emit('add-board-click', tabName)">
            Add new dropzone
        </button>

        <main class="flexbox">
            <Board 
                v-for="(board, index) in boards"
                :key="index"
                id=index>
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
    name: "Tab",
    props: {
        tabName: '',
        boards: [],
    },
    components: {
        Board,
    },
    emits: ['add-board-click']
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
