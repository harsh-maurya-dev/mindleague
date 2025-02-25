import React, { useEffect, useRef, useState } from 'react'
import { BiBell } from 'react-icons/bi';
import { apiCall } from '../../api/apiCall';
import { useTranslation } from 'react-i18next';

const Notification = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState({})
    const notificationRef = useRef(null);
    const [isLoading, setIsloading] = useState(true)
    const [error, setError] = useState(true)

    const { t, i18n } = useTranslation()

    // Sample notification data - replace with your actual data source
    // const notifications = [
    //     {
    //         id: 1,
    //         type: 'PAY_COACH',
    //         user: 'David',
    //         timestamp: '11:57:01, 18/02/2025',
    //         amount: '$1000',
    //         description: 'שילם/שילמה $1000 עבור הזמנת מבצע אימון.',
    //         avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    //     },
    //     {
    //         id: 2,
    //         type: 'BUY_PLAN',
    //         user: 'Sohan kumar',
    //         timestamp: '18:24:55, 17/02/2025',
    //         amount: '$5',
    //         description: 'שילם/שילמה $5 עבור מנוי Level 1.',
    //         avatar: '/api/placeholder/40/40'
    //     },
    //     {
    //         id: 3,
    //         type: 'BUY_PLAN',
    //         user: 'Thomas Shelby',
    //         timestamp: '19:17:39, 14/02/2025',
    //         amount: '$3',
    //         description: 'שילם/שילמה $3 עבור מנוי Level 1.',
    //         avatar: '/api/placeholder/40/40'
    //     },
    //     {
    //         id: 4,
    //         type: 'NEW_STUDENT',
    //         user: 'Anthony',
    //         timestamp: '17:42:46, 14/02/2025',
    //         description: 'new_student_notification_admin',
    //         avatar: '/api/placeholder/40/40'
    //     }
    // ];

    const fetchNotification = async () => {
        try {
            const url = "/notification/getNotifications";
            const response = await apiCall("PATCH", url);
            setNotifications(response.results.notifications);
            // console.log(response);
        } catch (err) {
            setError(err.message || "An error occurred");
        }
        finally {
            setIsloading(false)
        }
    }

    // Close notification panel when clicking outside
    useEffect(() => {

        fetchNotification()
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };


    }, []);

    // Toggle notification panel
    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case 'PAY_COACH':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">PAY_COACH</span>;
            case 'BUY_PLAN':
                return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">BUY_PLAN</span>;
            case 'NEW_STUDENT':
                return <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">NEW_STUDENT</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{type}</span>;
        }
    };

    function convertDate(isoDate) {
        if (isoDate) {
            const date = new Date(isoDate);
            return date.toLocaleDateString()
        }
        return ""
    }


    return (
        <div>
            <div className="relative" ref={notificationRef}>
                {/* Notification Bell with Counter */}
                <button
                    className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={toggleNotifications}
                    aria-label="Notifications"
                >
                    <BiBell size={24} />
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </button>

                {/* Notification Panel */}
                {isOpen && (
                    <div className={`${i18n.language === "en" ? "absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-md shadow-lg overflow-hidden z-50" : "left-0 absolute mt-2 w-80 md:w-96 bg-white rounded-md shadow-lg overflow-hidden z-50"}`}>
                        <div className="py-2 px-3 bg-gray-100 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {notifications.length} new
                                </span>
                            </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <div key={notification.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                        <div className="p-4">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mr-3">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                                        <img
                                                            src={notification.sender?.profileimage || "https://admin.mindleague.com/static/media/favicon3.7cd71738fbe7f3f00e68.png"}
                                                            alt={notification.user}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-xl px-2 font-medium text-gray-900">
                                                            {notification.sender?.firstname}
                                                        </h4>
                                                        {getTypeBadge(notification.type)}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">{convertDate(notification?.createdat)}</p>
                                                    {notification.amount && (
                                                        <p className="text-sm font-medium mt-1">{notification.amount}</p>
                                                    )}
                                                    <p className="text-sm text-gray-600 mt-1" dir="rtl">
                                                        {i18n.language === "en" ? notification?.description_en : notification?.description_he}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">
                                    No new notifications
                                </div>
                            )}
                        </div>

                        <div className="py-2 px-4 bg-gray-50 text-center border-t border-gray-100">
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                Mark all as read
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification
