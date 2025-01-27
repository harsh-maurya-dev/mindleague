import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaEye, FaTrash } from "react-icons/fa";
import FilterPopup from '../components/FilterPopUp';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([
        {
            id: 1,
            name: "Michael Brown",
            age: 12,
            rating: 1600,
            email: "mike@example.com",
            tPlayed: 20,
            city: "Los Angeles",
            pId: "0123 1230 123",
            status: true, // Active (toggle on)
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 2,
            name: "Sophia Johnson",
            age: 14,
            rating: 1700,
            email: "sophia.j@example.com",
            tPlayed: 25,
            city: "New York",
            pId: "4567 8901 234",
            status: false, // Inactive (toggle off)
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 3,
            name: "William Davis",
            age: 13,
            rating: 1500,
            email: "will.d@example.com",
            tPlayed: 18,
            city: "Chicago",
            pId: "8901 2345 678",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 4,
            name: "Emma Wilson",
            age: 11,
            rating: 1550,
            email: "emma.w@example.com",
            tPlayed: 22,
            city: "San Francisco",
            pId: "1234 5678 901",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 5,
            name: "James Taylor",
            age: 12,
            rating: 1650,
            email: "james.t@example.com",
            tPlayed: 28,
            city: "Dallas",
            pId: "2345 6789 012",
            status: false,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 6,
            name: "Olivia Anderson",
            age: 14,
            rating: 1720,
            email: "olivia.a@example.com",
            tPlayed: 30,
            city: "Houston",
            pId: "3456 7890 123",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 7,
            name: "Benjamin Martinez",
            age: 13,
            rating: 1580,
            email: "ben.m@example.com",
            tPlayed: 26,
            city: "Phoenix",
            pId: "4567 8901 234",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 8,
            name: "Ava Hernandez",
            age: 12,
            rating: 1610,
            email: "ava.h@example.com",
            tPlayed: 19,
            city: "Miami",
            pId: "5678 9012 345",
            status: false,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 9,
            name: "Lucas Robinson",
            age: 11,
            rating: 1540,
            email: "lucas.r@example.com",
            tPlayed: 21,
            city: "Seattle",
            pId: "6789 0123 456",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 10,
            name: "Mia Thompson",
            age: 13,
            rating: 1680,
            email: "mia.t@example.com",
            tPlayed: 24,
            city: "Boston",
            pId: "7890 1234 567",
            status: false,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 11,
            name: "Noah Clark",
            age: 14,
            rating: 1730,
            email: "noah.c@example.com",
            tPlayed: 27,
            city: "Denver",
            pId: "8901 2345 678",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 12,
            name: "Charlotte Lewis",
            age: 12,
            rating: 1640,
            email: "charlotte.l@example.com",
            tPlayed: 23,
            city: "Atlanta",
            pId: "9012 3456 789",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 13,
            name: "Elijah Walker",
            age: 13,
            rating: 1590,
            email: "elijah.w@example.com",
            tPlayed: 20,
            city: "Portland",
            pId: "1234 5678 901",
            status: false,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 14,
            name: "Amelia Young",
            age: 11,
            rating: 1520,
            email: "amelia.y@example.com",
            tPlayed: 18,
            city: "San Diego",
            pId: "2345 6789 012",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
        {
            id: 15,
            name: "Ethan Hall",
            age: 14,
            rating: 1740,
            email: "ethan.h@example.com",
            tPlayed: 32,
            city: "Austin",
            pTd: "3456 7890 123",
            status: true,
            action: {
                visible: true,
                delete: false
            }
        },
    ])

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    // console.log(tableData);

    const statsCards = [
        { title: "Total Leagues", count: "250+" },
        { title: "Total Tournament", count: "250+" },
        { title: "Total Team Managers", count: "150+" },
        { title: "Total Students/Players", count: "100+" },
        { title: "Total Coaches", count: "100+" },
        { title: "Total Commissioners", count: "100+" },
        { title: "Total Alumni", count: "100+" }
    ];


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


    return (
        <div className="bg-[#f1f1f1]  flex-1 p-6 container overflow-hidden pt-20">
            {/* cards section */}
            <div className="flex flex-wrap gap-2">
                {
                    statsCards.map((value, index) => {
                        return (
                            <div className="bg-[#007acc] transition-all delay-500  w-full text-white md:w-64 p-6 rounded-md" key={index}>
                                <h3 className="text-sm font-bold">{value.title}</h3>
                                <p className="text-4xl font-bold before:content-[' '] before:w-[2px] before:bg-white before:h-[20px]">{value.count}</p>
                            </div>
                        )
                    })
                }
            </div>

            {/* table section */}
            <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-y-scroll">
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
                        <FilterPopup
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
                {/* Main table */}
                <div className="bg-white overflow-y-scroll rounded-md">
                    <table className="w-full">
                        <thead>
                            <tr className="text-sm text-left">
                                <th className="py-3 px-3">S.NO.</th>
                                <th className="py-3 px-3">NAME</th>
                                <th className="py-3 px-3">AGE</th>
                                <th className="py-3 px-3">RATING</th>
                                <th className="py-3 px-3">EMAIL</th>
                                <th className="py-3 px-3">TOTAL GAMES PLAYED</th>
                                <th className="py-3 px-4">CITY</th>
                                <th className="py-3 px-4">PAYPAL ID</th>
                                <th className="py-3 px-4">STATUS</th>
                                <th className="py-3 px-4">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(tableData) && tableData.length > 0 ? (
                                tableData.map((data, index) => (
                                    <tr className="border-b border-t text-[#828282] text-[14px]" key={index}>
                                        <td className="px-2 py-2">{data.id}</td>
                                        <td className="px-2 py-2">{data.name}</td>
                                        <td className="px-2 py-2">{data.age}</td>
                                        <td className="px-2 py-2">{data.rating}</td>
                                        <td className="px-2 py-2">{data.email}</td>
                                        <td className="px-2 py-2">{data.tPlayed}</td>
                                        <td className="px-2 py-2">{data.city}</td>
                                        <td className="px-2 py-2">{data.pId}</td>
                                        <td className="px-2 py-2">
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
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <div className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer">
                                                    <FaEye className="text-[12px]" />
                                                </div>
                                                <div className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer">
                                                    <FaTrash className="text-[12px]" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center">
                                        No data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
