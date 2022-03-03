<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import VueFeather from "vue-feather";

defineProps({
    list: Number,
});
const showFormAdd = ref(false);
const title = ref("");
const store = useStore();

function toggleFormAdd() {
    showFormAdd.value = !showFormAdd.value;
}
function addItem(list) {
    const payload = {
        title: title.value,
        list: list,
    };
    store.commit("ADD_ITEM", payload);
    title.value = "";
    toggleFormAdd();
}
</script>

<template>
    <button
        class="bg-gray-100 hover:bg-gray-200 text-gray-600 flex justify-center font-medium rounded-lg px-4 py-2 mt-5 w-full"
        @click="toggleFormAdd"
        v-if="!showFormAdd"
    >
        <vue-feather
            type="plus"
            size="16px"
            class="self-center mr-1"
        ></vue-feather>
        Add Item
    </button>
    <div class="relative mt-5" v-if="showFormAdd">
        <input
            type="text"
            placeholder="Type item title here"
            class="border border-gray-400 focus:border-blue-500 outline-none rounded-lg px-3 py-2 w-full mr-2"
            autofocus
            v-model="title"
            @keyup.enter="addItem(list)"
        />
        <div class="flex justify-end mt-2">
            <button
                class="bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold rounded-lg px-4 py-2 mr-2"
                @click="toggleFormAdd"
            >
                Cancel
            </button>
            <button
                class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2"
                @click="addItem(list)"
                :disabled="!title"
            >
                Add
            </button>
        </div>
    </div>
</template>
