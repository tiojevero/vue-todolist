<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import VueFeather from "vue-feather";

defineProps({
    item: Object,
});

const store = useStore();

const showFormEdit = ref(false);
const title = ref("");

function toggleFormEdit(titleName) {
    showFormEdit.value = !showFormEdit.value;
    title.value = titleName;
}

function editItem(id) {
    const payload = {
        id: id,
        title: title.value,
    };
    store.commit("EDIT_ITEM", payload);
    toggleFormEdit();
}

function removeItem(id) {
    store.commit("REMOVE_ITEM", id);
}
</script>

<template>
    <div
        class="rounded-lg overflow-hidden border bg-white flex justify-between px-3 py-2 mb-2 cursor-grab touch-none overscroll-y-contain"
    >
        <div class="flex w-full" v-if="showFormEdit">
            <input
                type="text"
                class="bg-gray-100 border focus:border-blue-500 rounded outline-none px-2 mr-2 w-full"
                placeholder="title"
                autofocus
                v-model="title"
                @keyup.enter="editItem(item.id)"
            />
            <button
                class="bg-blue-500 text-white rounded px-2"
                @click="editItem(item.id)"
            >
                Save
            </button>
        </div>
        <span
            :class="`self-center ${
                item.list === 3 ? 'line-through text-gray-600' : ''
            }`"
            v-if="!showFormEdit"
        >
            {{ item.title }}
        </span>
        <div class="flex gap-2" v-if="!showFormEdit">
            <button
                class="pointer flex text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded p-1 h-fit"
                @click="toggleFormEdit(item.title)"
            >
                <vue-feather type="edit" size="18px"></vue-feather>
            </button>
            <button
                class="pointer flex text-gray-500 hover:bg-red-50 hover:text-red-500 rounded p-1 h-fit"
                @click="removeItem(item.id)"
            >
                <vue-feather type="trash-2" size="18px"></vue-feather>
            </button>
        </div>
    </div>
</template>
