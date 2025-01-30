import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APIENDPOINT}`
});

const token = localStorage.getItem("x-auth-token-user");
const type = localStorage.getItem("x-auth-user-type");

const config = {
    headers: {
        accept: "application/json",
        "x-auth-token-user": token,
        "x-auth-user-type": type,
    },
};
/**
 * Common API call function
 * @param {string} method - HTTP method (e.g., 'get', 'post', 'patch', 'put', 'delete')
 * @param {string} url - API endpoint
 * @param {object} data - Request body (optional, defaults to {})
 * @returns {Promise} - Axios response
 */
export const apiCall = async (method, url, data = {}) => {
    try {
        const response = await api({
            method,
            url,
            data,
            ...config,
        });
        return response.data; // Return only the data part of the response
    } catch (error) {
        console.error("API call failed:", error);
        throw error; // Re-throw the error for handling in the component
    }
};