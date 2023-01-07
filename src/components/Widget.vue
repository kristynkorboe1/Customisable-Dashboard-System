<template>
    <div
        :id="id"
        class="widget"
        :draggable="draggable"
        @dragstart="dragStart"
        @dragover.stop>
        <slot />
    </div>
</template>

<script>
export default {
    props:['name', 'id', 'draggable'],
    methods: {
        dragStart: e => {
            const target = e.target;
            e.dataTransfer.setData('widget_id', target.id);
        }
    }
}
</script>
