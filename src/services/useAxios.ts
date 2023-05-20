import axios from 'axios';
import { accessStore, userRefreshStore } from '../cookies/cookieStore';
import { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } from '../cookies/cookieName';
import { removeCookie, setCookie, setRefreshCookie } from '../cookies/useCookies';
const BASE_API_URL = import.meta.env.VITE_BASE_URL;


export const useAxios = () => {
    const axiosApiInstance = axios.create();
    const UNAUTHORIZED = 400;

    // for the handel refresh token
    const refreshAccessToken = async (refreshToken: string) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/auth/applyRefreshToken`, {
                refresh_token: refreshToken
            });
            if (res) {
                console.log("res refresh", res)
                accessStore.set(res.data.access_token);
                setCookie(AUTH_COOKIE_NAME, res.data.access_token);
                userRefreshStore.set(res.data.refresh_token);
                setRefreshCookie(AUTH_REFRESH_COOKIE_NAME, res.data.refresh_token);
                return res.data.access_token;
            }
        } catch (e: any) {
            accessStore.set('');
            userRefreshStore.set('');
            removeCookie(AUTH_COOKIE_NAME);
            removeCookie(AUTH_REFRESH_COOKIE_NAME);
            throw new Error(e);
        }
    };

    let cookie: string = '';
    accessStore.subscribe((value) => (cookie = value));
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;

    const get = (url: string) => axiosApiInstance.get(`${BASE_API_URL}${url}`);
    const post = (url: string, body: unknown) => axiosApiInstance.post(`${BASE_API_URL}${url}`, body);
    const put = (url: string, body?: unknown) => axiosApiInstance.put(`${BASE_API_URL}${url}`, body);
    const patch = (url: string, body: unknown) =>
        axiosApiInstance.patch(`${BASE_API_URL}${url}`, body);
    const del = (url: string) => axiosApiInstance.delete(`${BASE_API_URL}${url}`);

    const toExport = (url: string) =>
        axios.get(`${BASE_API_URL}${url}`, {
            headers: {
                Authorization: `Bearer ${cookie}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
                'x-responsetype': 'file'
            }
        });

    // Request interceptor for API calls(common headers for all methods)
    axiosApiInstance.interceptors.request.use(
        async (config) => {
            config.headers = {
                Authorization: `Bearer ${cookie}`
                // Accept: 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded'
            };
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );



    // Response interceptor for API calls
    axiosApiInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const isLoginApi = error.config.url.includes('/auth/adminlogin');
            const isTwoFact = error.config.url.includes('/api-admin/chk2FAstatus');
            const originalRequest = error.config;
            if (error.response.status === UNAUTHORIZED && !isLoginApi && !isTwoFact) {
                // refresh token
                let refreshToken: string = '';
                userRefreshStore.subscribe((val) => (refreshToken = val));
                // refetch
                originalRequest._retry = true;
                const access_token = await refreshAccessToken(refreshToken);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                return axiosApiInstance(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return { get, post, put, patch, delete: del, toExport };
};
export default useAxios;
