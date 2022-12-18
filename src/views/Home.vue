<template>
    <button class="newTab" @click="open = true">
        <span class="material-symbols-outlined">
            add_box
        </span>
    </button>

    
    <Teleport to="body">
        <div v-if="open" class="modal">
            <h2>Add new tab</h2>
            <form>
                            <label>Tab name:</label>
                            <input type="text" required v-model="tabName">

                            <select v-model="gridType">
                                <option value="standard1">2x3 grid with text fields</option>
                                <option value="standard2">3x2 grid with text fields</option>
                                <option value="standard3">4x2 grid with text fields</option>
                            </select>
                        </form>
            <button @click="open = false">Add</button>
        </div>
    </Teleport>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        z-index: 999;
        top: 20%;
        left: 57%;
        width: 300px;
        margin-left: -150px;
        background-color: var(--dark-alt);
        padding: 0.5rem 0.5rem;
    }

    .newTab {
        top: 0;
        float: right;
        background-color: var(--light);
        border: 0px;
        padding: 0.1rem 0.1rem;
    }

    .newTab .material-symbols-outlined {
        font-size: 3rem;
        color: var(--dark-alt);
    }
</style>