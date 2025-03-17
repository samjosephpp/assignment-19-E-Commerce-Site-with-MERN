import React from 'react';
// import axios from 'axios';

import axiosInstance from './axiosService';

const API_URL = import.meta.env.VITE_API_URL;


export const getShoppingitems = async() => {
    try {
        // const response = await axios.get(`${API_URL}/api/products/shopitems`);
        const response = await axiosInstance.get(`${API_URL}/products/shopitems`, { withCredentials: true })
        // console.log('------------------------getShoppingitems------------------')
        // console.log(response)
        return { success: response.status, message: response.data.message, data: response.data };         
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}

export const getProducts = async() => {
    try {
        // const response = (await require('../authService').axiosWithoutAuth()).get("")
        const response = await axiosInstance.get(`${API_URL}/products` , { withCredentials: true })        
        return { success: response.status, message: response.data.message, data: response.data };         
  
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}

export const addNewProduct = async(product) =>{
    try {
        // const response = (await require('../authService').axiosWithoutAuth()).get("")
        const response = await axiosInstance.post(`${API_URL}/products`, product , { withCredentials: true })        
        return { success: response.status, message: response.data.message, data: response.data };         
  
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}

export const updateProduct = async(product) =>{
    try {
        const response = await axiosInstance.put(`${API_URL}/products/${product._id}`, product , { withCredentials: true })        
        return { success: response.status, message: response.data.message, data: response.data };         
  
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}


export const removeProduct = async(productId) =>{
    try {
        const response = await axiosInstance.delete(`${API_URL}/products/${productId}`, { withCredentials: true })        
        return { success: response.status, message: response.data.message, data: response.data };         
  
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}


export const createOrder = async (orderData) => {
    try {
        // console.log(`orderData : ${orderData}`)
        const response = await axiosInstance.post(`${API_URL}/orders`, orderData, { withCredentials: true });
        return { success: true, data: response.data , message: response.data.message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Error creating order" };
    }
};

export const getmyorders = async() =>{
   
    try {        
        const response = await axiosInstance.get(`${API_URL}/orders/myorders`, { withCredentials: true })      
        return { success: response.status, message: response.data.message, data: response.data };         
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}


export const getOrders = async() =>{
   
    try {        
        const response = await axiosInstance.get(`${API_URL}/orders`, { withCredentials: true })    
       
        return { success: response.status, message: response.data.message, data: response.data };         
    } catch (error) {
        return { success: false, message: error.message?.data?.message || "Error" };
    }
}

