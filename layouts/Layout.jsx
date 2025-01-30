import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const Layout = ({isOpenNav,setIsOpenNav}) => {
  const handleNavToggle = () => {
    setIsOpenNav(!isOpenNav)
  }
  return (
      <>
        <Header handleNavToggle={handleNavToggle}/>
        <div className="flex h-screen overflow-hidden">
        <Sidebar isOpenNav={isOpenNav}/>
        <Outlet /> {/* This renders child routes like Dashboard */}
        </div>
      </>
  );
};

export default Layout;
