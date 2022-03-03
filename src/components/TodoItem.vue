<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import VueFeather from "vue-feather";

defineProps({
    items: Array,
});

const store = useStore();

const showForm = ref(false);
const title = ref("");

const pageX = ref(0);
const pageY = ref(0);

function startDrag(event, item) {
    // console.log(item);
    const payload = {
        event: event,
        item: item,
    };
    store.commit("START_DRAG", payload);
}

function handleTouchMove(event) {
    if (event.target.localName !== "span") {
        const touchLocation = event.targetTouches[0];
        pageX.value = touchLocation.pageX;
        pageY.value = touchLocation.pageY;
        event.target.style.position = "absolute";
        event.target.style.width = "16rem";
        event.target.style.top = pageY.value - 50 + "px";
        console.log(pageY.value);
        console.log(event);
    }
}

function handleTouchEnd(item) {
    const dropzone1El = document.querySelector("#dropzone1");
    const dropzone2El = document.querySelector("#dropzone2");
    const dropzone3El = document.querySelector("#dropzone3");

    const dropzone1 = {
        x: dropzone1El.offsetLeft,
        y: dropzone1El.offsetTop,
        y2: dropzone1El.offsetTop + dropzone1El.offsetHeight,
    };
    const dropzone2 = {
        x: dropzone2El.offsetLeft,
        y: dropzone2El.offsetTop,
        y2: dropzone2El.offsetTop + dropzone2El.offsetHeight,
    };
    const dropzone3 = {
        x: dropzone3El.offsetLeft,
        y: dropzone3El.offsetTop,
        y2: dropzone3El.offsetTop + dropzone3El.offsetHeight,
    };
    if (pageY.value > dropzone1.y && pageY.value < dropzone1.y2) {
        const payload = {
            item: item,
            list: 1,
        };
        store.commit("CHANGE_LIST", payload);
    } else if (pageY.value > dropzone2.y && pageY.value < dropzone2.y2) {
        const payload = {
            item: item,
            list: 2,
        };
        store.commit("CHANGE_LIST", payload);
    } else if (pageY.value > dropzone3.y && pageY.value < dropzone3.y2) {
        const payload = {
            item: item,
            list: 3,
        };
        store.commit("CHANGE_LIST", payload);
    }
}

function toggleForm(titleName) {
    showForm.value = !showForm.value;
    title.value = titleName;
}

function editItem(id) {
    const payload = {
        id: id,
        title: title.value,
    };
    store.commit("EDIT_ITEM", payload);
    toggleForm();
}

function removeItem(id) {
    store.commit("REMOVE_ITEM", id);
}
</script>

<template>
    <div
        :class="`rounded-lg overflow-hidden border bg-white flex justify-between px-3 py-2 mb-2 cursor-grab touch-none overscroll-y-contain ${
            item.list === 3 ? 'line-through text-gray-600' : ''
        }`"
        v-for="item in items"
        :key="item.id"
        draggable="true"
        @dragstart="startDrag($event, item)"
        @touchmove="handleTouchMove($event)"
        @touchend="handleTouchEnd(item)"
    >
        <div class="flex w-full" v-if="showForm">
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
        <span class="self-center" v-if="!showForm">
            {{ item.title }}
        </span>
        <div class="flex gap-2" v-if="!showForm">
            <button
                class="pointer flex text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded p-1"
                @click="toggleForm(item.title)"
            >
                <vue-feather type="edit" size="16px"></vue-feather>
            </button>
            <button
                class="pointer flex text-gray-500 hover:bg-red-50 hover:text-red-500 rounded p-1"
                @click="removeItem(item.id)"
            >
                <vue-feather type="trash-2" size="16px"></vue-feather>
            </button>
        </div>
    </div>
</template>
