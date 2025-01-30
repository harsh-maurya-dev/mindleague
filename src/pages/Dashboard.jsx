import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaEye, FaTrash } from "react-icons/fa";
import DashboardFilter from '../components/popup/DashboardFilter';
// import { getDashboardData } from '../../slices/dashboard/dashboardSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDashboard } from '../../services/GetService';
import { Link } from 'react-router-dom';
import { apiCall } from '../../api/apiCall';
import SkeletonTable from '../../shimmer/SkeletonTable';
import SkeletonStats from '../../shimmer/SkeletonStats';

const Dashboard = () => {
    // const { dashboardData, error, status } = useSelector((state) => state.dashboardData || {})
    // const dispatch = useDispatch()

    const [stats, setStats] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    localStorage.setItem("x-auth-token-user", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDY3LCJpYXQiOjE3MzgwNDEyNTUsImV4cCI6MTczODY0NjA1NX0.XKG5JTUMW-W4j8BcD4s6q-16F7aQyc_gKDkaVBK9Ii0")
    localStorage.setItem("x-auth-user-type", "admin")

    const handleToggle = (index, currentStatus) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[index] = {
                ...newData[index],
                status: !currentStatus
            };
            return newData;
        });
    };

    const fetchDashboardData = async () => {
        try {
            const url = "/analytics/admin/getRecentStudents";
            const response = await apiCall("PATCH", url);
            setTableData(response.results.students);

        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const url = "/analytics/admin/getStatistics";
            const response = await apiCall("GET", url);
            setStats(response.results.students);
            console.log(response.results.students);
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        // fetchStats()
        // if (status === 'idle') {
        // dispatch(getDashboardData());
        // }
        fetchStats()
        fetchDashboardData()
    }, []);


    return (
        <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll">
            {/* cards section */}
            {
                loading ? <SkeletonStats /> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-center items-center">
                        {
                            stats.map((value, index) => {
                                return (
                                    <div className="bg-[#007acc] transition-all delay-500 text-white p-4 rounded-md" key={index}>
                                        <h3 className="text-sm font-semibold">TOTAL {(value.usertype).toUpperCase()}</h3>
                                        <div className='flex items-center justify-between pt-2'>
                                            <div className='w-[5px] h-[30px] bg-white rounded-xl'></div>
                                            <p className="text-4xl font-bold before:content-[' '] before:w-[2px] before:bg-white before:h-[20px]">{value.totalusers}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }


            {/* table section */}
            {
                loading ? <SkeletonTable /> : (
                    <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
                        <div className='flex justify-between items-center py-4'>
                            <h2 className="text-lg font-bold mb-4">Recent Student / Players</h2>
                            <div className='flex justify-between gap-4'>
                                <div className='bg-[#f1f1f1] flex justify-center items-center px-2 rounded-md'>
                                    <input type='text' placeholder='Search' className='bg-gray-100 focus:outline-none ' />
                                    <IoSearch className='text-2xl' />
                                </div>
                                <DashboardFilter
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    openModal={openModal}
                                    closeModal={closeModal}
                                />
                            </div>
                        </div>
                        {/* Main table */}
                        <div className="bg-white  rounded-md">
                            <table className="overflow-x-scroll">
                                <thead>
                                    <tr className="text-sm text-left">
                                        <th className="text-sm font-semibold tracking-wide text-left">S.NO.</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">NAME</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">AGE</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">RATING</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">EMAIL</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">TOTAL GAMES PLAYED</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">CITY</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">PAYPAL ID</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">STATUS</th>
                                        <th className="p-3 text-sm font-semibold tracking-wide text-left">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.length > 0 && tableData.map((data, index) => (
                                            <tr className="border-b border-t text-[#828282] text-[14px]" key={index}>
                                                <td className="p-3 text-left text-sm">{index + 1}</td>
                                                <td className="p-3 text-left text-sm">{data?.firstname + " " + data?.lastname}</td>
                                                <td className="p-3 text-left text-sm">{data.details?.age}</td>
                                                <td className="p-3 text-left text-sm">{data.details?.rating.toFixed(0)}</td>
                                                <td className="p-3 text-left text-sm">{data?.email}</td>
                                                <td className="p-3 text-left text-sm">{data.details?.totalMatches}</td>
                                                <td className="p-3 text-left text-sm">{data.details?.city}</td>
                                                <td className="p-3 text-left text-sm">{data.details?.paypalId || "--"}</td>
                                                <td className="p-3 text-left text-sm">
                                                    <div
                                                        className="flex items-center"
                                                        onClick={() => handleToggle(index, data.status)}
                                                    >
                                                        <span
                                                            className={`block w-8 h-4 rounded-full transition-colors duration-300 ${data.status ? "bg-[#007acc]" : "bg-gray-400"
                                                                } cursor-pointer`}
                                                        >
                                                            <span
                                                                className={`inline-block mb-[2px] w-3 h-3 transform transition-transform duration-300 rounded-full bg-white ${data.status ? "translate-x-4" : "translate-x-1"
                                                                    }`}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex gap-2">
                                                        <Link to="/dashboard-details" className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer">
                                                            <FaEye className="text-[12px]" />
                                                        </Link>
                                                        <div className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer">
                                                            <FaTrash className="text-[12px]" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Dashboard

