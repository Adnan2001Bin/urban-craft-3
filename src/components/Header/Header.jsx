import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutBtn } from "../index";
import EditWebsite from "../Edit WebSite/EditWebsite";
// import BedroomCatagories from "../ProductCatagories/Beedroom/BedroomCatagories";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData ? userData.$id : false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Bedroom",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      slug: "/BedRoomCatagoriesPage",
      active: authStatus,
      // dropdownMenu: <BedroomCatagories />
    },
    {
      name: "Dinning",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      slug: "/DinningRoomCatagoriesPage",
      active: authStatus,
      // dropdownMenu:
    },
    {
      name: "Living Room",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      slug: "/living Room",
      active: authStatus,
    },
    {
      name: "Office",
      slug: "/office",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      active: authStatus,
    },
    {
      name: "Door",
      slug: "/door",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      active: authStatus,
    },
    {
      name: "Edit WebSite",
      img: "https://cdn-icons-png.flaticon.com/128/2722/2722987.png",
      active: authStatus && isAuthor,
      dropdownMenu: <EditWebsite />,
    },
  ];

  return (
    <header
      className={`w-full bg-white lg:h-20 border-b-2 border-gray-200 flex items-center px-10 lg:px-20 justify-between  ${
        scrolled ? "fixed top-0 z-10" : ""
      }`}
    >
      <Link to={"/"}>
        <img
          className="w-44 lg:w-48"
          src="public\Studio Shodwe.png"
          alt="Studio Shodwe"
        />
      </Link>

      <div className="lg:flex lg:justify-center lg:items-center lg:w-7/12 lg:h-9 lg:gap-3 font-MyFont1 font-medium text-base hover:rounded-lg hidden">
        {navItems.map((item) =>
          item.active ? (
            <div className="relative group ml-5 ">
              <div
                className="flex items-center justify-between "
                key={item.name}
              >
                <button
                  onClick={() => navigate(item.slug)}
                  className={`hover:font-medium transition-all duration-100 hover:border-b-2 hover:border-yellow-500 list-none font-fontFooter1 ${
                    location.pathname === item.slug ? "text-yellow-500" : ""
                  }`}
                >
                  {item.name}
                </button>

                {item.name !== "Home" && (
                  <img
                    className="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180"
                    src={item.img}
                    alt=""
                  />
                )}
              </div>
              <div className="absolute z-[999] hidden group-hover:block">
                {item.dropdownMenu}
              </div>
            </div>
          ) : null
        )}
      </div>
      {authStatus && (
        <div className="flex">
          <LogoutBtn />
        </div>
      )}
    </header>
  );
}

export default Header;
