import axios from "axios";

const url = 'https://snu-chat2.herokuapp.com';

export const signup = (name) => {
    return axios.post(`${url}/signup`, { name });
}

export const login = () => {
    return axios({
        url: `${url}/login`,
        method: 'post',
        headers: {
            Authorization: `Key ${localStorage.getItem('key')}`
        }
    });
}

export const loadRooms = () => {
    return axios.get(`${url}/rooms`);
}

export const loadChats = (roomId, from, order) => {
    return axios({
        url: `${url}/rooms${roomId}/chats`,
        data: {from, order},
        method: 'get',
        headers: {
            Authorization: `Key ${localStorage.getItem('key')}`
        }
    });
}
