import { writable } from "svelte/store";

export const authUserStore = writable({
    isLoading: true,
    currentUser: null
})

export const setModeStore = writable({
    theme: "light",

})

export const theme = writable('light');

