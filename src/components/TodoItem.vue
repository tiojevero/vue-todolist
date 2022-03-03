<script setup>
import { useStore } from "vuex";
import VueFeather from "vue-feather";

const store = useStore();

function startDrag(event, item) {
    // console.log(item);
    const payload = {
        event: event,
        item: item,
    };
    store.commit("START_DRAG", payload);
}

function removeItem(id) {
    store.commit("REMOVE_ITEM", id);
}

defineProps({
    items: Array,
});
</script>

<template>
    <div
        :class="`rounded-lg overflow-hidden border bg-white flex justify-between px-4 py-2 mb-2 cursor-grab ${
            item.list === 3 ? 'line-through text-gray-600' : ''
        }`"
        v-for="item in items"
        :key="item.id"
        draggable="true"
        @dragstart="startDrag($event, item)"
    >
        <span class="self-center">
            {{ item.title }}
        </span>
        <button
            class="pointer flex text-gray-500 hover:bg-red-50 hover:text-red-500 rounded p-1"
            @click="removeItem(item.id)"
        >
            <vue-feather type="trash-2" size="16px"></vue-feather>
        </button>
    </div>
</template>
