<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
import TodoItem1 from "./TodoItem.vue";

const store = useStore();

const todos = computed(() =>
    store.state.items.filter((item) => item.list === 1)
);
const progress = computed(() =>
    store.state.items.filter((item) => item.list === 2)
);
const finish = computed(() =>
    store.state.items.filter((item) => item.list === 3)
);

function startDrag(event, item) {
    // console.log(item);
    const payload = {
        event: event,
        item: item,
    };
    store.commit("startDrag", payload);
}

function onDrop(event, list) {
    const payload = {
        event: event,
        list: list,
    };
    store.commit("onDrop", payload);
}

function increment() {
    store.commit("increment");
}
</script>

<template>
    <div class="grid grid-cols-3 gap-5">
        <div
            class="rounded-xl bg-white p-5"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">📝 To Do</h2>
            <TodoItem :items="todos" :start-drag="startDrag" />
        </div>
        <div
            class="rounded-xl bg-white p-5"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">🚀 On Progress</h2>
            <TodoItem :items="progress" :start-drag="startDrag" />
        </div>
        <div
            class="rounded-xl bg-white p-5"
            @drop="onDrop($event, 3)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">✅ Finish</h2>
            <TodoItem :items="finish" :start-drag="startDrag" />
        </div>
    </div>
</template>
