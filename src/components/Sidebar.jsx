import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  
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
  
  // console.log(selected);
  

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="text-[#241f20] bg-white w-64 h-full relative top-10 py-6 hidden md:block overflow-y-scroll no-scrollbar">
      <nav>
        <ul>
          {sideValues.map((value, index) => (
            <li
              key={index}
              // className={`flex items-center font-bold text-sm py-3 cursor-pointer hover:rounded-r-full mr-4 mb-2 hover:bg-[#007acc] hover:text-white ${
              //   selected === index ? "bg-[#007acc] text-white rounded-r-full" : ""
              // }`}
              onClick={() => handleClick(index)}
            >
              <Link 
                className={`flex items-center font-bold text-sm py-3 gap-2 px-4 cursor-pointer hover:rounded-r-full mr-4 mb-2 hover:bg-[#007acc] hover:text-white  ${
                selected === index ? "bg-[#007acc] text-white rounded-r-full" : ""
              }`}
              // className="flex justify-center items-center gap-2 px-4"
               to={value.path}>
                <span>{value.icon}</span>
                <span>{value.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
