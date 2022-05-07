import { BASE_URL } from "../environment";

export function gettoken() {
    return fetch(BASE_URL + "/api/user-access-token").then(res => res.json()).then((data => {
        return data;
    }));
}

export function getdataonsearch(query = '') {
    return fetch(BASE_URL + `/api/data?search_string=${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            "user-access-token": window.localStorage.getItem('token')
        },
        // body: JSON.stringify(query)
    }).then(res => res.json()).then((data => {
        return data;
    }));
}

export const initialStates = {
    search: '',
    data: []
}