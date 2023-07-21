import Header from "../header";
import SideBar from "../sideBar";

function Layout({ children }) {
  return (
    <>
      <SideBar />
      <Header />
      {children}
    </>
  );
}

export default Layout;
