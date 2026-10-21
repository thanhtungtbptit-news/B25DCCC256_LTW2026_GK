import { NavLink } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar" aria-label="Thanh menu chính">
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/books" end>Danh sách</NavLink>
    <NavLink to="/books/new" end>Thêm mới</NavLink>
  </nav>
);

export default NavBar;
