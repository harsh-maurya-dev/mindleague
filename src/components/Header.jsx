import React from 'react';
import logo from "../assets/logo.jpg"
import user from "../assets/user.png"
import { FaBars } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import Notification from './Notification';


const Header = ({ handleNavToggle }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-[#241f20] text-white py-2 px-6 flex flex-wrap gap-2 justify-between items-center fixed top-0 w-full z-50">
      <div className="text-3xl font-bold">Mindleague</div>
      <div className="mr-4 text-[#95bfe4] text-3xl font-extrabold">Admin Panel</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white rounded-md px-3 py-2 text-black">
          <img src={logo} alt="Hebrew" className="h-6 mr-2 rounded-full" />
          <span>Hebrew</span>
        </div>
        <Notification />
        <img src={user} />
        <FaBars className='block sm:hidden' onClick={handleNavToggle} />
      </div>
    </header>
  );
};

export default Header;