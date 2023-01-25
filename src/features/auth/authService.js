import axios from 'axios';


const API_URl = process.env.REACT_APP_BASE_URL;

//Register User
const signup = async(userData) => {
    console.log(userData)
    const response = await axios.post(`${API_URl}/api/users/signup`, userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//signin User
const login = async(userData) => {
    
    const response = await axios.post(`${API_URl}/api/users/login`, userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// logout user
const logout = async(userData) => {
    
    localStorage.removeItem('user');

}

const add = async(data, token)=>{ 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(`${API_URl}/api/users/add/${data.userId}`, data, config);  

    return response.data;
}

const remove = async(data, token)=>{ 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(`${API_URl}/api/users/remove/${data.userId}`, data, config);  

    return response.data;
}


const getSaved = async(data, token)=>{ 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.get(`${API_URl}/api/users/saved/${data.id}`, config);  
    return response.data;
}

//User stats
const userstats = async(token) => {
    
    const response = await axios.post(`${API_URl}/api/users/stats`, token);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {
    signup,
    login,
    logout,
    userstats,
    add,
    remove,
    getSaved
}

export default authService;