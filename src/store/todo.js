import { createSlice } from "@reduxjs/toolkit";
import { getData } from '../api/index'
const todoSlice = createSlice({
    name: "todo",
    initialState: {
        loading: true,
    },
    reducers: {
        onProcess: (state) => {
            state.loading = true;
        },
        onSuccess: (state, { payload }) => {
            state.error = null;
            state.loading = false;
            state.todo = {...state.todo, [payload.identifier]: payload.stateValue };
        },
        onFailed: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        onClear: (state, { payload }) => {
            state.todo = {
                [payload.identifier]: null
            };
        },
        onDelete: (state, { payload }) => ({
            ...state,
            todo: [...state.todo.splice(0, payload.id), ...state.todo.splice(1)],
            lastUpdated: Date.now()
        }),
    },
});
export default todoSlice.reducer;

const {
    onClear,
    onProcess,
    onFailed,
    onSuccess,
    onDelete,
    onAdd
} = todoSlice.actions;
export const getTodoList = () => async(dispatch) => {
    try {
        dispatch(onProcess());
        const response = await getData();
        console.log(response)
        const done = 'done'
        switch (done) {
            case 'done':
                dispatch(
                    onSuccess({
                        identifier: "todoList",
                        stateValue: response,
                    })
                );
                break;
            default:
                throw new Error("Uppss.. Terjadi kesalahan.");
        }
    } catch (e) {
        dispatch(onFailed(e.message));
    }
};
export const deleteTodo = (id) => async(dispatch) => {
    try {

        const response = id;
        switch (response) {
            case response:
                console.log(id)
                dispatch(onDelete({
                    identifier: "todoList",
                    id: id
                }));
                break;
            default:
                throw new Error("Uppss.. Terjadi kesalahan.");
        }
    } catch (e) {
        dispatch(onFailed(e.message));
    }
};
export const addTodo = ({ id, title, desc, createdAt }) => async(dispatch) => {
    try {
        dispatch(onProcess());


        switch ("ok") {
            case "ok":

                break;
            case 400:
                throw new Error("Tampaknya akun sudah ada");
            default:
                throw new Error("Uppss.. Terjadi kesalahan.");
        }
    } catch (e) {
        dispatch(onFailed(e.message));
    }
};