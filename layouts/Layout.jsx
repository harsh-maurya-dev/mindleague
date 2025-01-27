import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";
import Sidebar from "../src/components/Sidebar";

const Layout = () => {
  return (
    <div>
      <main>
        <Header />
        <div className="flex w-full h-full">
        <Sidebar/>
        <Outlet /> {/* This renders child routes like Dashboard */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
