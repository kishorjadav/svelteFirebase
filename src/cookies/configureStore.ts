import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { getCookie } from './useCookies';

export function localCookie(key: string, value: string = ''): Writable<string> {
    const data = getCookie(key);
    const store = writable(value);
    if (data !== '') {
        store.set(data || '');
    }

    return store;
}