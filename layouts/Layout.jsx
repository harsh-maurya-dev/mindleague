import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const Layout = () => {
  return (
      <>
        <Header />
        <div className="flex h-full overflow-hidden">
        <Sidebar/>
        <Outlet /> {/* This renders child routes like Dashboard */}
        </div>
      </>
  );
};

export default Layout;
