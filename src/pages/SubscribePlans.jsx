import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoSearch } from 'react-icons/io5'
import { apiCall } from '../../api/apiCall';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SkeletonTable from '../../shimmer/SkeletonTable';


const SubscribePlans = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation()

    const fetchData = async () => {
        try {
            const url = "/subscription/getPlans";
            const response = await apiCall
                ("PATCH", url);
            setPlans(response.results.plans);
            console.log(response.results.plans);


        } catch (err) {
            // setError(err.message || "An error occurred");
            console.log(err);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (


        <div className='bg-[#f1f1f1] flex-1 p-6 container pt-20 relative top-0 overflow-y-scroll'>
            {
                loading ? <SkeletonTable /> : (
                    <div className='mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen overflow-x-scroll'>
                        <>
                            <div className='flex justify-between items-center py-4'>
                                <h2 className="text-lg font-bold mb-4">{t("Student Player Subscriptions")}</h2>
                                <div className='flex justify-between gap-4'>
                                    <div className='bg-[#f1f1f1] flex justify-center items-center px-4 rounded-md py-4'>
                                        <input type='text' placeholder='Search' className='bg-gray-100 focus:outline-none ' />
                                        <IoSearch className='text-2xl' />
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white  rounded-md">
                                <table className=" overflow-y-scroll">
                                    <thead>
                                        <tr className="text-sm text-left">
                                            <th className="p-3 font-semibold">{t("S.NO.")}</th>
                                            <th className="p-3 font-semibold">{t("PLAN NAME")}</th>
                                            <th className="p-3 font-semibold">{t("PRICE")}</th>
                                            <th className="p-3 font-semibold">{t("FEATURES INCLUDED")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans.map((plan, index) => (
                                            <tr
                                                className="border-b border-t text-[#828282] text-[14px]"
                                                key={index}
                                            >
                                                <td className="p-3">{index + 1}</td>
                                                <td>{i18n.language === "en" ? plan?.name_en : plan?.name_he}</td>
                                                <td>${plan?.price}</td>
                                                <td>
                                                    <ul className="list-disc pl-5">
                                                        {plan?.features.map((feature, key) => (
                                                            <li key={key}>{feature}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            to="/dashboard-details"
                                                            className="w-6 h-6 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer"
                                                        >
                                                            <FaEye className="text-[12px]" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    </div>
                )
            }

        </div>
    )
}

export default SubscribePlans
