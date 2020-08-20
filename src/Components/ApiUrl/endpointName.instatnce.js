import axios from 'axios';

export const instance = axios.create({
    baseURL:"https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1" 
})