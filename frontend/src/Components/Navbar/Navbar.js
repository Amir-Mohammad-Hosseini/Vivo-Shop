import React, { useContext, useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import swal from 'sweetalert';

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate()
  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus`)
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus);
      });
  }, []);
    const handleCartClick = (event) => {
    event.preventDefault();
    if (!authContext.isLoggedIn) {
      // اگر وارد نشده است
      swal({
        title: "لطفاً ابتدا وارد سایت شوید",
        icon: "warning",
        buttons: {
          login: { text: "رفتن به صفحه لاگین", value: "login" },
          cancel: "انصراف",
        },
      }).then((value) => {
        if (value === "login") {
          navigate("/login");
        }
      });
    } else if (authContext.userInfos.role === "ADMIN") {
      // اگر مدیر است
      swal({
        title: "دسترسی مدیر به سبد خرید وجود ندارد",
        text: "برای مشاهده سفارشات لطفاً با حساب کاربری عادی وارد شوید",
        icon: "error",
        button: "متوجه شدم",
      });
    } else {
      // کاربر عادی
      navigate("/my-account/orders");
    }
  };

  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی ویووشاپ"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  صفحه اصلی
                </a>
              </li>

              {allMenus.map((menu, index) => (
                <li className="main-header__item" key={index}>
                  <Link to={`${menu.href}/1`} className="main-header__link">
                    {menu.title}
                    {menu.submenus.length !== 0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {menu.submenus.map((submenu) => (
                            <li className="main-header__dropdown-item">
                              <Link
                                to={submenu.href}
                                className="main-header__dropdown-link"
                              >
                                {submenu.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}

              {/* <li className="main-header__item">
                <a href="#" className="main-header__link">
                  فرانت اند
                  
                </a>
              </li> */}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" onClick={handleCartClick} className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>

            {authContext.isLoggedIn ? (
              <Link to="/my-account" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
