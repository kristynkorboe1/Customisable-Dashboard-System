    <template>
    <div class="tab">

        <h2>{{ tabName }}</h2>
        <div>
            <p 
                class="desc" 
                contenteditable="true"
                placeholder="You can add your notes here..."
                @input="onInput">
                {{ notes }}
            </p>
            <button 
                @click="saveNotes">
                Save notes
            </button>
        </div>
            
        <button 
            class="newBoard" 
            @click="$emit('add-board-click')">
            Add new board
        </button>

        <main class="flexbox">
            <Board 
                v-for="(board, index) in boards"
                :id="board.id"
                :key="index"
                :widget="boards[index].widget"
                :parentTab="tabName"
                :exerciseData="exerciseData"
                :isFetchingED="isFetchingED"
                :showWeek="board.showWeek"
                :style="{ height: `${board.height}px`, width: `${board.width}px`}"
                @delete-board="deleteBoard(board.id)"
                @reload-board="$emit('reload-tab')">
            </Board>
        </main> 
    </div>
    
</template>

<script>
import Board from '../components/Board.vue'

export default {
    name: "Tab",
    props: {
        tabName: '',
        boards: [],
        widgets: [],
        exerciseData: [],
        notes: '',
        isFetchingED: true
    },
    data() {
		return {
			newNotes:""
		}
	},
    components: {
        Board,
    },
    methods: {
        async deleteBoard(boardID) {	
            const result = await fetch('http://localhost:5000/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.tabName)
		    const tabID = tab.id
            const boardIndex = tab.boards.findIndex(board => board.id === boardID)
            tab.boards.splice(boardIndex, 1)
            this.boards.splice(boardIndex, 1)

			await fetch(`http://localhost:5000/tabs/${tabID}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(tab),
				})
        
            $emit('reload-tab')
		},

        onInput(e) {
            this.newNotes=e.target.innerText
        },

        async saveNotes() {
            const result = await fetch('http://localhost:5000/tabs')
            const data = await result.json()
            const tab = data.find(tab => tab.tabName === this.tabName)
		    const tabID = tab.id
            tab.notes = this.newNotes

			const res = await fetch(`http://localhost:5000/tabs/${tabID}`, 
				{
					method: 'PUT',
					headers: {
					'Content-type': 'application/json',
					},
					body: JSON.stringify(tab),
				})

            location.reload()

            // $emit('reload-tab')
        }

    },
    emits: ['add-board-click', 'reload-tab']
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

    p {
        margin-left: 0px;
    }

    button {
        background-color: var(--light);
			border: 2px solid var(--dark);
			border-radius: 4px;
			color: var(--dark);
			font-size: 0.8rem;
			padding: 2px;
			margin-left: 0px;
    }

    .desc {
        width: 1200px;
        height: 20px;
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

    select {
			background-color: var(--light);
			border-color: var(--dark);
			border-radius: 4px;
			padding: 2px;
			margin-top: 5px;
			margin-left: 5px;
		}
</style>
