<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import TodoItem from "./TodoItem.vue";
import TodoAdd from "./TodoAdd.vue";

const store = useStore();

const allItem = computed(() => store.state.items);

const todos = computed(() =>
    store.state.items.filter((item) => item.list === 1)
);
const progress = computed(() =>
    store.state.items.filter((item) => item.list === 2)
);
const finish = computed(() =>
    store.state.items.filter((item) => item.list === 3)
);

onBeforeMount(() => {
    if (localStorage.items) {
        store.commit("REPLACE_ITEMS", JSON.parse(localStorage.items));
    }
});

watch(
    allItem,
    () => {
        const stringifyItems = JSON.stringify(store.state.items);
        localStorage.items = stringifyItems;
    },
    { deep: true }
);

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

function onDrop(event, list) {
    const payload = {
        event: event,
        list: list,
    };
    store.commit("ON_DROP", payload);
}

function handleTouchMove(event) {
    if (event.target.classList[0] === "rounded-lg") {
        const touchLocation = event.targetTouches[0];
        pageX.value = touchLocation.pageX;
        pageY.value = touchLocation.pageY;
        event.target.style.position = "absolute";
        event.target.style.width = "18rem";
        event.target.style.top = pageY.value - 50 + "px";
    }
}

function handleTouchEnd(event, item) {
    event.target.style.position = "static";
    event.target.style.width = "100%";

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
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent
            id="dropzone1"
        >
            <h2 class="font-bold mb-4">📝 To Do</h2>
            <TodoItem
                :item="item"
                v-for="item in todos"
                :key="item.id"
                draggable="true"
                @dragstart="startDrag($event, item)"
                @touchmove="handleTouchMove($event)"
                @touchend="handleTouchEnd($event, item)"
            />
            <TodoAdd :list="1" />
        </div>
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent
            id="dropzone2"
        >
            <h2 class="font-bold mb-4">🚀 On Progress</h2>
            <TodoItem
                :item="item"
                v-for="item in progress"
                :key="item.id"
                draggable="true"
                @dragstart="startDrag($event, item)"
                @touchmove="handleTouchMove($event)"
                @touchend="handleTouchEnd($event, item)"
            />
            <TodoAdd :list="2" />
        </div>
        <div
            class="rounded-xl bg-white p-5 h-fit"
            @drop="onDrop($event, 3)"
            @dragenter.prevent
            @dragover.prevent
            id="dropzone3"
        >
            <h2 class="font-bold mb-4">✅ Finish</h2>
            <TodoItem
                :item="item"
                v-for="item in finish"
                :key="item.id"
                draggable="true"
                @dragstart="startDrag($event, item)"
                @touchmove="handleTouchMove($event)"
                @touchend="handleTouchEnd($event, item)"
            />
            <TodoAdd :list="3" />
        </div>
    </div>
</template>
