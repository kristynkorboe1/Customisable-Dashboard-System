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
        <slot />
    </div>
</template>

<script>
export default {
    props: {
    },
    methods: {
        drop: e => {
            const widget_id = e.dataTransfer.getData('widget_id');
            const widget = document.getElementById(widget_id);
            widget.style.display = "block";
            e.target.appendChild(widget);
            console.log(this)
        },
    },
    emits: ['delete-board']
}
</script>

<style scoped>
    .closeButton .material-symbols-outlined {
        font-size: 2rem;
        right: 20px;
        color: var(--light);
    }

</style>