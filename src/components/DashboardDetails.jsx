import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCall } from '../../api/apiCall';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../slices/dashboard/dashboardSlice';

const DashboardDetails = () => {
    const [userData, setUserData] = useState(null);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const {dashboardData} = useSelector((state)=>state.dashboardSlice)
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            const url = `/user/admin/viewUser/${id}`;
            const response = await apiCall("GET", url);
            setUserData(response.results?.user[0]); // Set the user data
            setDetails(response.results?.user); // Set the user data
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getDashboardData())
        fetchData();
    }, [id]); // Add `id` as a dependency to refetch data if `id` changes

    // Destructure userData
    const {
        firstname,
        lastname,
        phonenumber,
        email,
        details: {
            city,
            school,
            wins,
            loss,
            draw,
            totalMatches,
            level,
            teamLeagues,
            teamSessions,
            friendMatches,
            botMatches,
            individualLeagues,
            individualSession,
            tournamentMatches,
            fatherName,
            fatherEmail,
            fatherPhoneNumber,
            motherName,
            motherEmail,
            motherPhoneNumber,
            manager: { firstname: managerFirstName },
            subscriptionDetail: { name_en, createdat, enddate },
        },
    } = userData;

    console.log(details);
    

    return (
        <div className="mt-8 border-[1px] border-gray-200 py-10 px-10 bg-[#f1f1f1] rounded-md h-screen overflow-x-scroll  w-full">
            <div className="flex items-center mb-6">
                <button className="p-2 bg-[#0077cc] text-white rounded-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
            <div className='bg-white p-6 border-[1px] border-gray-200 rounded-md'>
                {/* player details */}
                <h2 className="my-4 text-lg font-bold">Recent Student/Players Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border rounded-md ">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium"> Name</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{firstname}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{email}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Name Of School</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{school}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Login Name</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{firstname + ' ' + lastname}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">City</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{city}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Assigned Team Manager</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">N/A</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Subscription</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{name_en}</div>
                    </div>
                    {/* Add more fields as needed */}
                </div>
                {/* parents details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border rounded-md mt-4">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Father Name</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{fatherName}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Father Email</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{fatherEmail}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Father Phone Number</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{fatherPhoneNumber}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Mother Name</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{motherName}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Mother Email</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{motherEmail}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Mother Phone Number</label>
                        <div className="p-3 bg-gray-100 rounded-md text-sm cursor-not-allowed">{motherPhoneNumber}</div>
                    </div>
                    {/* Add more fields as needed */}
                </div>
                <table className="overflow-x-scroll">
                    <thead>
                        <tr className="text-sm text-left">
                            <th className="text-sm font-semibold tracking-wide text-left">S.NO.</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">AGE</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">PHONE NUMBER</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">RATING</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">RATING DEVIATIONS</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">PAYPAL ID</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">WINS</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">LOSSES</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">DRAWS</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">TOTAL GAME PLAYED</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">SUBSCRIPTION LEVEL</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">SUBSCRIPTION PERIOD (IN YEAR)</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">TEAM BOARD NO</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">NUMBER OF FRIENDS</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">GAMES PLAYED WITH FRIENDS</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">GAMES PLAYED WITH BOT</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">NO OF LEAGUES PLAYED</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">NO OF SESSION WITH TEAM COACH</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">NO OF SESSION WITH INDIVIDUAL COACH</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">NO OF INDIVIDUAL TOURNAMENT PLAYED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details.length > 0 && details.map((data, index) => (
                                <tr className="border-b border-t text-[#828282] text-[14px]" key={index}>
                                    <td className="p-3 text-left text-sm">{index + 1}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.age}</td>
                                    <td className="p-3 text-left text-sm">{data?.phonenumber}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.rating.toFixed(0)}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.rating_deviation}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.paypalId || "N/A"}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.wins}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.loss && "N/A"}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.draw && "N/A"}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.totalMatches}</td>
                                    <td className="p-3 text-left text-sm">{data.details.subscriptionDetail?.id}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.age}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.board}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.friends}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.friendMatches}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.botMatches}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.leagueMatches}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.sessions && "N/A"}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.individualSession && "N/A"}</td>
                                    <td className="p-3 text-left text-sm">{data.details?.tournamentMatches && "N/A"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardDetails;