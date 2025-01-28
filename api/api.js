import webHttpService from "../webHttpService";

export async function callApi({ url, method = "GET", data = null }) {
    const token = localStorage.getItem("x-auth-token-user");
    const type = localStorage.getItem("x-auth-user-type");

    const defaultHeaders = {
        accept: "application/json",
        "x-auth-user-type": type,
    };

  try {
    const response = await webHttpService({
      method,
      url: `${import.meta.env.VITE_APIENDPOINT}/${url}`,
      data,
      headers: {...defaultHeaders},
    });

    return { data: response.data }; // Return the data
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message); // Alert error message if available
    }
    return { error }; // Return the error for further handling
  }
}
