import axios from 'axios';
// import {API} from '../../api'
export const API_URl = 'http://localhost:5000/api/movies/';

const getmovie = async(data) => {
    
    let url = '';
    if(data.search) url =  `/api/movie/?search=${data.search}`;
    
    else{
        url = '/api/movie/';
    }
    
    const response = await API_URl.get(url);  
    return response.data;
}
const addmovie = async(data, token) => {
  
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.post(API_URl, data, config);  
    return response.data;
}

const updatemovie = async(data, token) => {
   
    console.log(data)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(API_URl, + `${data.id}`  , data, config);  
    return response.data;
}

const likemovie = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(API_URl + `like/${data.id}`, data, config);  
    return response.data;
}

const deletemovie = async(id, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete('API_URl,/'+ id, config); 
    console.log(response.data) 
    return response.data;
}
const movieService = {
    addmovie,
    getmovie,
    updatemovie,
    likemovie,
    deletemovie
}

export default movieService;