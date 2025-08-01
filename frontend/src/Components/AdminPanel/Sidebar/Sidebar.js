import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import swal from "sweetalert";

import "./Sidebar.css";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutAdmin = (event) => {
    event.preventDefault();
    swal({
      title: "با موفقیت لاگ‌آوت شدین",
      icon: "success",
      buttons: "اوکی",
    }).then(() => {
      authContext.logout();
      navigate("/");
    });
  };

  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>محصولات</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>کامنت‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="tickets">
              <span>تیکت‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="offs">
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="discounts">
              <span>تخفیف همگانی</span>
            </Link>
          </li>
          <li>
            <Link to="category">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="contacts">
              <span>پیغام‌ها</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
