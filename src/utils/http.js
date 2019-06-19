import axios from 'axios';

const API = axios.create({
    baseURL:"https://calm-springs-34916.herokuapp.com/api/v1",
    timeout:7000
})

export {
    API
}