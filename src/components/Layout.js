import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ loading, error }) => (
  <div className="app-shell">
    <NavBar />
    <main className="main-content">
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p role="alert">Không tải được dữ liệu</p>
      ) : (
        <Outlet />
      )}
    </main>
  </div>
);

export default Layout;
