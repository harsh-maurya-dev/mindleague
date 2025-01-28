import axios from "axios";

export default function apiCalls({ url }) {
    return {
        get: async function () {
            try {
                const token = localStorage.getItem("x-auth-token-user");
                const type = localStorage.getItem("x-auth-user-type");
                const config = {
                    headers: {
                        accept: "application/json",
                        "x-auth-token-user": token,
                        "x-auth-user-type": type,
                    },
                };
                const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}${url}`, config);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        },

        patch: async function () {
            try {
                const token = localStorage.getItem("x-auth-token-user");
                const type = localStorage.getItem("x-auth-user-type");
                const config = {
                    headers: {
                        accept: "application/json",
                        "x-auth-token-user": token,
                        "x-auth-user-type": type,
                    },
                };
                const response = await axios.patch(`${process.env.REACT_APP_ENDPOINT}${url}`, {}, config);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        },
    };
}
