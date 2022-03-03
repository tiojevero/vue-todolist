<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import VueFeather from "vue-feather";

defineProps({
    items: Array,
});

const store = useStore();

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
    const touchLocation = event.targetTouches[0];
    pageX.value = touchLocation.pageX;
    pageY.value = touchLocation.pageY;
    event.target.style.position = "absolute";
    event.target.style.width = "16rem";
    event.target.style.top = pageY.value - 50 + "px";
    console.log(pageY.value);
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

function removeItem(id) {
    store.commit("REMOVE_ITEM", id);
}
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
        @touchmove="handleTouchMove($event)"
        @touchend="handleTouchEnd(item)"
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
