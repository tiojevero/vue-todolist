import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            items: [
                {
                    id: 0,
                    title: "Good",
                    list: 1,
                },
                {
                    id: 1,
                    title: "Mantab",
                    list: 1,
                },
                {
                    id: 2,
                    title: "Great",
                    list: 2,
                },
                {
                    id: 3,
                    title: "Waw",
                    list: 3,
                },
            ],
        };
    },
    mutations: {
        startDrag(state, payload) {
            payload.event.dataTransfer.dropEffect = "move";
            payload.event.dataTransfer.effectAllowed = "move";
            payload.event.dataTransfer.setData("itemID", payload.item.id);
        },
        onDrop(state, payload) {
            const itemID = payload.event.dataTransfer.getData("itemID");
            const item = state.items.find((item) => item.id == itemID);
            item.list = payload.list;
        },
    },
});

export default store;
