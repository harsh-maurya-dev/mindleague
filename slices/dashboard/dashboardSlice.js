import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
    const token = localStorage.getItem("x-auth-token-user")
    const type = localStorage.getItem("x-auth-user-type")
    const config = {
        headers: {
            'accept': 'application/json',
            'x-auth-token-user': token,
            'x-auth-user-type': type,
        },
    }
    const response = await axios.patch(
        'https://mindleague.com:2053/analytics/admin/getRecentStudents',
        {}, config

    );
    // console.log(response.data.results);
    return response.data.results;
    
});

const dashboardApi = createSlice({
    name: "dashboardSlice",
    initialState: {
        dashboardData: [],
        status: "idle",
        error: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dashboardData = action.payload;
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dashboardApi.reducer;
