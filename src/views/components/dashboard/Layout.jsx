import { Helmet } from "react-helmet";

import DashboardNavbar from "./Navbar";
import DashboardSidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Helmet>
        <title>Blog Express | Dashboard</title>
      </Helmet>
      <DashboardNavbar />
      <DashboardSidebar />
      {children}
    </>
  );
}
