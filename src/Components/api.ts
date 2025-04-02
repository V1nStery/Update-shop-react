import axios from 'axios';
import Callback from './Callback/Callback';

export const fetchProduct = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1/myApiLaravel/my-app/public/api/products/${id}`); //  <-  template literal
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); //  <-  template literal
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
        throw error; 
    }
};



export const updateProduct = async (id, updatedProduct, token) => {
    try {
        const response = await axios.put(
            `http://127.0.0.1/myApiLaravel/my-app/public/api/products/${id}`,
            updatedProduct,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.data.product;
    } catch (error) {
        console.error('Ошибка при обновлении товара:', error);
        throw error;
    }
};




export const fetchAllProducts = async () => {
    try {
        const response = await fetch('http://127.0.0.1/myApiLaravel/my-app/public/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        throw error;
    }
};


export const deleteProduct = async (id, token) => {
    try {
        const response = await axios.delete(
            `http://127.0.0.1/myApiLaravel/my-app/public/api/products/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        throw error;
    }
};