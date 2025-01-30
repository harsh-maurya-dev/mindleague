import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
  FaTrophy,
  FaSchool,
  FaUserShield,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpenNav }) => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const sideValues = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Student/Players", icon: <FaUserGraduate />, path: "/students-players" },
    { name: "Alumni Management", icon: <FaUsers />, path: "/alumni-management" },
    { name: "Team Managers", icon: <FaUserTie />, path: "/team-managers" },
    { name: "League", icon: <FaTrophy />, path: "/league" },
    { name: "School Management", icon: <FaSchool />, path: "/school-management" },
    { name: "Commissioners", icon: <FaUserShield />, path: "/commissioners" },
    { name: "Coach", icon: <FaChalkboardTeacher />, path: "/coach" },
    { name: "Sponsor Management", icon: <FaHandsHelping />, path: "/sponsor-management" },
    { name: "Subscription Plan", icon: <FaMoneyCheckAlt />, path: "/subscription-plan" },
    { name: "Payout Management", icon: <FaCreditCard />, path: "/payout-management" },
    { name: "Transaction", icon: <FaCreditCard />, path: "/transaction" },
    { name: "Cheat Detection", icon: <FaExclamationTriangle />, path: "/cheat-detection" },
    { name: "Help & Support", icon: <FaQuestionCircle />, path: "/help-support" },
    { name: "Content Management", icon: <FaFileAlt />, path: "/content-management" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  const handleClick = (path) => {
    setSelected(path);
  };

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);


  return (

    <div
      className={`fixed md:static inset-y-0 left-0 w-72 bg-white z-10 overflow-y-auto no-scrollbar pt-16 pb-10 pr-4 shadow-md md:shadow-none transform transition-transform duration-300 ease-in-out ${isOpenNav ? "translate-x-0 top-0" : "-translate-x-full md:translate-x-0 top-10"
        }`}>
      <nav>
        <ul>
          {sideValues.map((value) => (
            <li key={value.path}>
              <Link to={value.path} onClick={() => handleClick(value.path)}>
                <div
                  className={`flex items-center font-bold text-sm py-3 gap-2 px-4 cursor-pointer hover:rounded-r-full mr-4 mb-2 hover:bg-[#007acc] w-full hover:text-white ${selected === value.path ? "bg-[#007acc] px-4 py-3 w-full text-white rounded-r-full" : ""}`}
                >
                  <span>{value.icon}</span>
                  <span>{value.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
