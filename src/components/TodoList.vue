<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
import TodoAdd from "./TodoAdd.vue";

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

function onDrop(event, list) {
    const payload = {
        event: event,
        list: list,
    };
    store.commit("ON_DROP", payload);
}
</script>

<template>
    <div class="grid grid-cols-3 gap-5">
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">📝 To Do</h2>
            <TodoItem :items="todos" />
            <TodoAdd :list="1" />
        </div>
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">🚀 On Progress</h2>
            <TodoItem :items="progress" />
            <TodoAdd :list="2" />
        </div>
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 3)"
            @dragenter.prevent
            @dragover.prevent
        >
            <h2 class="font-bold mb-4">✅ Finish</h2>
            <TodoItem :items="finish" />
            <TodoAdd :list="3" />
        </div>
    </div>
</template>
