import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            items: [],
        };
    },
    mutations: {
        START_DRAG(state, payload) {
            console.log(payload);
            payload.event.dataTransfer.dropEffect = "move";
            payload.event.dataTransfer.effectAllowed = "move";
            payload.event.dataTransfer.setData("itemID", payload.item.id);
        },
        ON_DROP(state, payload) {
            const itemID = payload.event.dataTransfer.getData("itemID");
            const item = state.items.find((item) => item.id == itemID);
            item.list = payload.list;
        },
        CHANGE_LIST(state, payload) {
            const item = state.items.find((item) => item.id == payload.item.id);
            item.list = payload.list;
        },
        ADD_ITEM(state, payload) {
            const lastItem =
                state.items.length > 0 ? state.items.slice(-1).pop() : 1;
            const newItem = {
                id: state.items.length > 0 ? lastItem.id + 1 : 1,
                title: payload.title,
                list: payload.list,
            };
            state.items.push(newItem);
        },
        EDIT_ITEM(state, payload) {
            const item = state.items.find((item) => item.id == payload.id);
            item.title = payload.title;
        },
        REMOVE_ITEM(state, id) {
            const itemIndex = state.items.findIndex((item) => {
                return item.id === id;
            });
            state.items.splice(itemIndex, 1);
        },
        REPLACE_ITEMS(state, payload) {
            state.items = payload;
        },
    },
});

export default store;
