import axios from 'axios';
import { data } from 'react-router-dom';

import axiosInstance from './axiosService';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
    try {
        // const response = await axios.post(`${API_URL}/user/login`, credentials, { withCredentials: true });
        const response = await axiosInstance.post(`${API_URL}/users/login`, credentials, { withCredentials: true })
            // .then(response => {
            //     console.log('Login successful:', response.data);             
            // })
            // .catch(error => {
            //     if (error.response) {
            //         // Server responded with a status other than 2xx
            //         console.error('Response error:', error.response.data);
            //     } else if (error.request) {
            //         // No response received
            //         console.error('No response:', error.request);
            //     } else {
            //         // Other errors
            //         console.error('Error message:', error.message);
            //     }
              
            // });
        // if (!response.success) {
        //     console.log('Not success')
        // }
        return { success: true, message: response.message, token: response.token, refreshToken: response.refreshToken, role: response.data.role, data: response.data };

    } catch (error) {
     
        return { 
            success: false, 
            message: error.response?.data?.message || "Error" 
        };
    }
}


export const signupUser = async (userdata) => {
    try {
        console.log(userdata)
        // const response = await axios.post(`${API_URL}/user/register`, {userdata}, { withCredentials: true });
        // const response = await axios.post(`${API_URL}/user/register`, userdata, {withCredentials:true})
        const response = await axiosInstance.post(`${API_URL}/users/register`, credentials, { withCredentials: true })

        return {
            success: true, message: response.data.message, token: response.token, refreshToken: response.refreshToken,
            data: response.data
        };
    } catch (error) {
        console.log(error)
        return { success: false, message: error.message?.data?.message || "Registration failed" };

    }
}
export const logout = async () => {
    try {
        // await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
        const response = await axiosInstance.post(`${API_URL}/users/logout`, credentials, { withCredentials: true })
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        return { success: true, message: "Logged out" };
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}



// export const axiosWithAuth = async () => {
//     const token = localStorage.getItem('token');
//     return axios.create({
//         baseURL: API_URL, // Replace with your API base URL
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         withCredentials: true // Include this option if needed
//     });
// }

// export const axiosWithoutAuth = async () => {
//     return axios.create({
//         baseURL: API_URL,
//         withCredentials : true
//     })
// }
//-----------------------------------------  Other services.

