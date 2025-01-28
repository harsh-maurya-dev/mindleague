import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaEye, FaTrash } from "react-icons/fa";
import DashboardFilter from '../components/popup/DashboardFilter';
import { Pagination } from '../components/Pagination';
import { getDashboardData } from '../../slices/dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from "../components/Loader"

const Dashboard = () => {
    const { dashboardData, error, status } = useSelector((state) => state.dashboardData || {})
    const [stats, setStats] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = 100; // Example total items count

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    
    const dispatch = useDispatch()

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

    const token = localStorage.getItem("x-auth-token-user")
    const type = localStorage.getItem("x-auth-user-type")
    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    'accept': 'application/json',
                    'x-auth-token-user': token,
                    'x-auth-user-type': type,
                },
            }
            const response = await axios.patch("https://mindleague.com:2053/analytics/admin/getRecentStudents", {}, config)
            // console.log(response.data.results.students);
            setTableData(response.data.results.students)
        } catch (error) {
            console.log("api error", error);
        }
    }

    const fetchStats = async () => {
        try {
            const config = {
                headers: {
                    'accept': 'application/json',
                    'x-auth-token-user': token,
                    'x-auth-user-type': type,
                },
            };
            const response = await axios.get("https://mindleague.com:2053/analytics/admin/getStatistics", config);
            // console.log(response.data.results);
            setStats(response.data.results.students)
        } catch (error) {
            console.log("stats error", error);
        }
    };



    useEffect(() => {
        // fetchStats()
        // if (status === 'idle') {
        // dispatch(getDashboardData());
        // }
        fetchStats()
        fetchData()
    }, []);


    return (
        <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20">
            {/* cards section */}
            <div className="flex flex-wrap gap-2">
                {
                    stats.map((value, index) => {
                        return (
                            <div className="bg-[#007acc] transition-all delay-500  w-full text-white md:w-64 p-6 rounded-md" key={index}>
                                <h3 className="text-md font-bold">{(value.usertype).toUpperCase()}</h3>
                                <div className='flex items-center justify-between pt-2'>
                                <div className='w-[5px] h-[30px] bg-white rounded-xl'></div>
                                <p className="text-4xl font-bold before:content-[' '] before:w-[2px] before:bg-white before:h-[20px]">{value.totalusers}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* table section */}
            <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
                <div className='flex justify-between items-center py-4'>
                    <h2 className="text-lg font-bold mb-4">Recent Student / Players</h2>
                    <div className='flex justify-between gap-4'>
                        <div className='bg-[#f1f1f1] flex justify-center items-center px-2 rounded-md'>
                            <input type='text' placeholder='Search' className='bg-gray-100 focus:outline-none ' />
                            <IoSearch className='text-2xl' />
                        </div>
                        {/* <div className='w-10 h-10 flex justify-center items-center bg-[#007acc] text-white rounded-lg'>
                            <FaFilter />
                        </div> */}
                        <DashboardFilter
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
                {/* Main table */}
                <div className="bg-white overflow-y-scroll rounded-md">
                    {
                        tableData.length > 0 ? (
                            <>
                                <table className="w-full overflow-x-scroll">
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
                            </>
                        ) : (
                            <Loader />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard
