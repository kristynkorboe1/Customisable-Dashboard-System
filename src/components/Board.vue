<template>
    <div
        :id="id"
        class="board"
        @dragover.prevent
        @drop.prevent="drop">
        <slot />
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods: {
        drop: e => {
            const widget_id = e.dataTransfer.getData('widget_id');
            const widget = document.getElementById(widget_id);
            widget.style.display = "block";
            e.target.appendChild(widget);
        }
    }
}
</script>

<style>
    .material-symbols-outlined {
        font-size: 24rem;
        color: var(--light);
        transition: 0.2s ease-out;
    }

    .widget, .widget .material-symbols-outlined {
        cursor: move;
    }

</style>