// export const SERVER_URL = `https://${import.meta.env.VITE_API_HOST}`;

export const SERVER_URL = 'https://ets-backend-vv91.onrender.com'
// export const SERVER_URL = 'http://192.168.7.5:10002'




const path = (url: string) => {
    return SERVER_URL.concat('/api').concat(url).concat('/');
};

// export const getApiPath = (path: string) => {
//     SERVER_URL.concat('/api/').concat(path);
// };

// export const getMediaPath = (route: string) => {
//     return SERVER_URL.concat(route);
// };

const API_ENDPOINTS = {
    auth: {
        login: path('/auth/login'),
        refresh_token: path('/auth/refresh'),
        businessunit: path('/businessunit/activelist'),
        saleschannel: (id: string) => path('/salesshop/getlist/' + id),
        set_saleschannel: path('/salesshop/select-salesshop'),
        user_access: path('/navigation/getlist'),
    },
    dashboard: {

        upload: () => path('/sync'),
        rooms: path('/rooms'),
        update_room: (id: string) => path('/rooms/' + id),
    },
    user: {

    },
};

export default API_ENDPOINTS;
