import { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } from "./cookieName";
import { localCookie } from "./configureStore";

export const accessStore = localCookie(AUTH_COOKIE_NAME, '');
export const userRefreshStore = localCookie(AUTH_REFRESH_COOKIE_NAME, '');

// export let accessStore = writable({
//     cookieName: '',
//     cookieValue: '',

// });

// export let accessStore = writable({
//     access_token: null,
//     refresh_token: null,

// });

// export const userCookie = localCookie(AUTH_COOKIE_NAME);

