<template>
    <div
        :id="id"
        :name="name"
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
        dragStart(e) {
            const target = e.target;
            e.dataTransfer.setData('widget_name', this.name.name);
        }
    }
}
</script>
