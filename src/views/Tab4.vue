<template>
    <div>
        <p class="desc" contenteditable="true" placeholder="Type tab description here..."></p>
        
        
        <button class="newBoard" @click="addBoard">
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

export default {
    name: "Tab2",
    components: {
        Board,
        Widget,
        BarChart
    },
    data() {
		return {
			boards: [
				{id: 1},
                {id: 2},
                {id: 3},
                
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
        max-height: calc(100vh - 9rem);
        overflow-y: scroll;
    }

    .flexbox .board {
       width: 390px;
       height: 390px;
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

    .flexbox .board .widget .material-symbols-outlined {
        font-size: 12rem;
        color: var(--light);
        transition: 0.2s ease-out;
        cursor: pointer;
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
</style>
