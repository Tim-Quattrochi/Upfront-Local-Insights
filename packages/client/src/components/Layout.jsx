import { Navbar } from "./Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">{children}</div>
    </>
  );
};
export default Layout;
