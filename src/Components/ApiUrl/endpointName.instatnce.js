import axios from 'axios';
import {getToken} from "../../Utils/Common"

export const instance = axios.create({
    baseURL:"https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1",
    headers:{
        Authorization: `Basic ${btoa(getToken())}`
        }
})