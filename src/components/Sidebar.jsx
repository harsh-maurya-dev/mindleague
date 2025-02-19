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
import { useTranslation } from "react-i18next";

const Sidebar = ({ isOpenNav }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const sideValues = [
    { name: t("Dashboard"), icon: <FaHome />, path: "/dashboard" },
    { name: t("Student/Players"), icon: <FaUserGraduate />, path: "/students-players" },
    { name: t("Alumni Management"), icon: <FaUsers />, path: "/alumni-management" },
    { name: t("Team Managers"), icon: <FaUserTie />, path: "/team-managers" },
    { name: t("League"), icon: <FaTrophy />, path: "/league" },
    { name: t("School Management"), icon: <FaSchool />, path: "/school-management" },
    { name: t("Commissioners"), icon: <FaUserShield />, path: "/commissioners" },
    { name: t("Coach"), icon: <FaChalkboardTeacher />, path: "/coach" },
    { name: t("Sponsor Management"), icon: <FaHandsHelping />, path: "/sponsor-management" },
    { name: t("Subscription Plan"), icon: <FaMoneyCheckAlt />, path: "/subscription-plan" },
    { name: t("Payout Management"), icon: <FaCreditCard />, path: "/payout-management" },
    { name: t("Transaction"), icon: <FaCreditCard />, path: "/transaction" },
    { name: t("Cheat Detection"), icon: <FaExclamationTriangle />, path: "/cheat-detection" },
    { name: t("Help & Support"), icon: <FaQuestionCircle />, path: "/help-support" },
    { name: t("Content Management"), icon: <FaFileAlt />, path: "/content-management" },
    { name: t("Logout"), icon: <FaSignOutAlt />, path: "/logout" },
  ];

  const handleClick = (path) => {
    setSelected(path);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage); // Change language
    sessionStorage.setItem("language", selectedLanguage)
    document.cookie = `i18next=${selectedLanguage}; path=/; max-age=${7 * 24 * 60 * 60}`;

  };

  useEffect(() => {
    document.body.dir = i18n.dir()
    console.log(i18n.dir());

    setSelected(location.pathname);
  }, [location.pathname, i18n, i18n.language]);

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 w-72 bg-white z-10 overflow-y-auto no-scrollbar pt-16 pb-10 pr-4 shadow-md md:shadow-none transform transition-transform duration-300 ease-in-out ${isOpenNav ? "translate-x-0 top-0" : "-translate-x-full md:translate-x-0 top-10"
        }`}
    >
      {/* <button
        onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
        className="bg-[#007acc] text-white px-4 py-2 mb-4 ml-4 rounded"
      >
        {i18n.language === "en" ? "Arabic" : "English"}
      </button> */}
      <select className='text-black'
        onChange={handleLanguageChange}
        value={i18n.language}>
        <option>select language</option>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>

      <nav>
        <ul>
          {sideValues.map((value) => (
            <li key={value.path}>
              <Link to={value.path} onClick={() => handleClick(value.path)}>
                <div
                  className={`flex items-center font-bold text-sm py-3 gap-2 px-4 cursor-pointer hover:rounded-r-full mr-4 mb-2 hover:bg-[#007acc] w-full hover:text-white ${selected === value.path
                    ? "bg-[#007acc] px-4 py-3 w-full text-white rounded-r-full"
                    : ""
                    }`}
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
