import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DashboardDetails = () => {
    const [fields, setFileds] = useState([])
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("x-auth-token-user")
            const type = localStorage.getItem("x-auth-user-type")
            const config = {
                headers: {
                    'accept': 'application/json',
                    'x-auth-token-user': token,
                    'x-auth-user-type': type,
                },
            }
            const response = await axios.patch("https://mindleague.com:2053/analytics/admin/getRecentStudents", {}, config)
            // console.log(response.data.results.students);
            setFileds(response.data.results.students)
        } catch (error) {
            console.log("api error", error);
        }
    }
    console.log(fields);

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
                <button className="p-2 bg-blue-500 text-white rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="ml-4 text-2xl font-bold">Recent Student/Players Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border rounded-lg">
                {fields.map((field, index) => {
                    const key = Object.keys(field)[0]; // Get the first key
                    const value = field[key]; // Get the value associated with the key
                    return (
                    <div key={index} className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            {Object.keys(key)}
                        </label>
                        <div className="p-3 bg-gray-100 rounded-md">
                            {value}
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default DashboardDetails
