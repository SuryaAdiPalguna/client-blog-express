import { Helmet } from "react-helmet";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, title }) {
  return (
    <>
      <Helmet>
        <title>Blog Express | {title}</title>
      </Helmet>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
