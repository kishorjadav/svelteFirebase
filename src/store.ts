import { writable } from "svelte/store";

export const authUserStore = writable({
    isLoading: true,
    currentUser: null
})
