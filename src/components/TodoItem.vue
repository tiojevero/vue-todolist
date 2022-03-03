<script setup>
defineProps({
    items: Array,
    startDrag: Function,
});
</script>

<template>
    <div
        :class="`rounded-lg border bg-white px-4 py-2 mb-2 cursor-grab ${
            item.list === 3 ? 'line-through text-gray-600' : ''
        }`"
        v-for="item in items"
        :key="item.id"
        draggable="true"
        @dragstart="startDrag($event, item)"
    >
        {{ item.title }}
    </div>
</template>
