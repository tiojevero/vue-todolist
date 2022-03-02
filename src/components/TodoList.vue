<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const count = computed(() => store.state.count);

function increment() {
    store.commit("increment");
}
</script>

<template>
    <h1>{{ count }}</h1>
    <button @click="increment">+</button>
</template>
