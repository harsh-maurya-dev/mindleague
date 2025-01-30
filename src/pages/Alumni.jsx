import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5';
import PlayerFilter from '../components/popup/PlayerFilter';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { apiCall } from '../../api/apiCall';
import SkeletonTable from '../../shimmer/SkeletonTable';

const Alumni = () => {
    const [playerData, setPlayerData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const fetchData = async () => {
        try {
            const url = "/analytics/admin/getRecentStudents";
            const response = await apiCall
                ("PATCH", url);
            setPlayerData(response.results.students);

        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const convertDate = (date) => {
        const newDate = new Date(date).toLocaleString();
        const dateOnly = newDate.split(",")[0]
        return dateOnly;
    };

    console.log(loading);
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <>
                <div className="bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll">
                    {/* Table Section */}
                    {
                        loading ? <SkeletonTable /> : (
                            <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll">
                                <div className="flex justify-between items-center py-4 w-full">
                                    <h2 className="text-lg font-bold mb-4">Recent Students / Players</h2>
                                    <div className="flex justify-between gap-4">
                                        <div className="bg-[#f1f1f1] flex justify-center items-center px-2 rounded-md">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                className="bg-gray-100 focus:outline-none"
                                            />
                                            <IoSearch className="text-2xl" />
                                        </div>
                                        <PlayerFilter
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                            openModal={openModal}
                                            closeModal={closeModal}
                                        />
                                    </div>
                                </div>
                                {/* Main Table */}
                                <div className="bg-white  rounded-md">
                                    <table className=" overflow-y-scroll">
                                        <thead>
                                            <tr className="text-sm text-left">
                                                <th className="p-3 font-semibold">S.NO.</th>
                                                <th className="p-3 font-semibold">NAME</th>
                                                <th className="p-3 font-semibold">START DATE</th>
                                                <th className="p-3 font-semibold">AGE</th>
                                                <th className="p-3 font-semibold">RATING</th>
                                                <th className="p-3  font-semibold">NAME OF SCHOOL</th>
                                                <th className="p-3 font-semibold">EMAIL</th>
                                                <th className="p-3 font-semibold">SUBSCRIPTION</th>
                                                <th className="p-3 font-semibold">CITY</th>
                                                <th className="p-3 font-semibold">PAYPAL ID</th>
                                                <th className="p-3 font-semibold">EMPLOYER</th>
                                                <th className="p-3 font-semibold">STATUS</th>
                                                <th className="p-3 font-semibold">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {playerData.map((data, index) => (
                                                <tr
                                                    className="border-b border-t text-[#828282] text-[14px]"
                                                    key={index}
                                                >
                                                    <td className="p-3">{index + 1}</td>
                                                    <td className=" w-32 p-3">
                                                        {data?.firstname} {data?.lastname}
                                                    </td>
                                                    <td className="p-3">
                                                        {convertDate(data.details?.createdAt)}
                                                    </td>
                                                    <td className="p-3">{data.details?.age}</td>
                                                    <td className="p-3">
                                                        {data.details?.rating?.toFixed(0)}
                                                    </td>
                                                    <td className="p-3 w-32">
                                                        {data.details?.school}
                                                    </td>
                                                    <td className="p-3">{data?.email}</td>
                                                    <td className="p-3">
                                                        {data.details?.subscription || '--'}
                                                    </td>
                                                    <td className="p-3">{data.details?.city}</td>
                                                    <td className="p-3">
                                                        {data.details?.paypalId || '--'}
                                                    </td>
                                                    <td className="p-3">
                                                        {data.details?.employer || '--'}
                                                    </td>
                                                    <td className="p-3">
                                                        <div
                                                            className="flex items-center cursor-pointer"
                                                            onClick={() =>
                                                                console.log('Toggle status logic here')
                                                            }
                                                        >
                                                            <span
                                                                className={`block w-8 h-4 rounded-full transition-colors duration-300 ${data.status
                                                                    ? 'bg-[#007acc]'
                                                                    : 'bg-gray-400'
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`inline-block mb-[2px] w-3 h-3 transform transition-transform duration-300 rounded-full bg-white ${data.status
                                                                        ? 'translate-x-4'
                                                                        : 'translate-x-1'
                                                                        }`}
                                                                />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex gap-2">
                                                            <Link
                                                                to="/dashboard-details"
                                                                className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer"
                                                            >
                                                                <FaEye className="text-[12px]" />
                                                            </Link>
                                                            <div className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer">
                                                                <FaTrash className="text-[12px]" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </div>
            </>
        </>
    )
}

export default Alumni
