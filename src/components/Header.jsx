import React from 'react';
import logo from "../assets/logo.jpg"
import user from "../assets/user.png"
import { FaBars } from "react-icons/fa6";


const Header = () => {
  return (
    <header className="bg-[#241f20] text-white py-2 px-6 flex flex-wrap gap-2 justify-between items-center fixed top-0 w-full z-10">
      <div className="text-3xl font-bold">Mindleague</div>
      <div className="mr-4 text-[#95bfe4] text-3xl font-extrabold">Admin Panel</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white rounded-md px-3 py-2 text-black">
          <img src={logo} alt="Hebrew" className="h-6 mr-2 rounded-full" />
          <span>Hebrew</span>
        </div>
        <img src={user}/>
        <FaBars className='block sm:hidden'/>
      </div>
    </header>
  );
};

export default Header;