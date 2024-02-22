import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./Nav.css";

import { cilHome, cilLibrary, cilSearch } from "@coreui/icons";
import {
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineBars,
} from "react-icons/ai";
import { FaUser, FaTimes } from "react-icons/fa";
import CIcon from "@coreui/icons-react";

const Navbar = () => {
  const [ca, setca] = useState();
  const history = useHistory();
  const logoutt = (e) => {
    e.preventDefault();

    axios.post("/api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };
  const [click, setclick] = useState(false);
  const hadleclick = () => setclick(!click);

  var autbutton = "";
  if (!localStorage.getItem("auth_token")) {
    autbutton = (
      <div className="d-flex gap-2">
        <NavLink
          className="nalink text-light px-3 "
          onClick={hadleclick}
          to="/login"
          style={{border:'2px solid #3e5c76', height:'30px', borderRadius:'5px'}}
        >
            <div style={{fontWeight:'500',  color:'#3e5c76'}} >LOGIN</div>
        </NavLink>
        <NavLink
          className="nalink text-light px-3 "
          onClick={hadleclick}
          to="/register"
          style={{background:'#3e5c76', height:'30px', borderRadius:'5px', }}
        >
            <div style={{fontWeight:'500',  color:'#fff'}} >Sing Up</div>
        </NavLink>
      </div>
    );
  } else {
    autbutton = (
      <div className="d-flex align-items-center justify-content-center ">
        <button
          onClick={logoutt}
          className="btn btn-danger d-flex align-items-center h-100 lout "
          style={{ marginRight: "px" }}
        >
          <div style={{fontWeight:'500'}} >LOGOUT</div>
        </button>
      </div>
    );
  }

  useEffect(() => {
    // axios.get(`/api/ap`).then(res => {
    //         if(res.data.status === 200)
    //         {
    //             setca(res.data.ca);
    //             // console.log(res.data.ca)
    //         }
    //         else
    //         {
    //             console.log('wkwkw')
    //         }
    //     }
    // )
  });

  const [nav, setnav] = useState(false);
  const chagebgnav = () => {
    if (window.scrollY >= 80) {
      setnav(true);
    } else {
      setnav(false);
    }
  };
  window.addEventListener("scroll", chagebgnav);

  return (
    <nav className={nav ? "navbarr  active" : "navbarr"}> 
      <div className="row w-100">
        <div className="navcon col-md-9  ">
          <div className="d-flex justify-content-around align-items-center w-100">
            <Link className="navlof text-black " to="/">
              STORAJA
            </Link>
            <div className=" d-flex justify-conten-between " style={{listStyle:"none"}} >
              <li className="navite">
                <NavLink
                  className="nalink text-light "
                  onClick={hadleclick}
                  exact
                  activeClassName="active"
                  to="/"
                >
                  <CIcon
                    className="sidebar-brand-narrow"
                    icon={cilHome}
                    height={20}
                    style={{ color: "#000" }}
                  />
                </NavLink>
              </li>
              <li className="navite  " style={{marginLeft:'50px'}}>
                <NavLink
                  className="nalink text-light "
                  onClick={hadleclick}
                  exact
                  activeClassName="active"
                  to="/collection"
                >
                  <CIcon
                    className="sidebar-brand-narrow"
                    icon={cilLibrary}
                    height={20}
                    style={{ color: "#000" }}
                  />
                </NavLink>
              </li>
            </div>
            <div className="w-50 ">
              <div
                className=" gap-2 p-1 px-3 d-flex align-items-center "
                style={{
                  background: "#fff",
                  border: "1px solid #ced4da",
                  borderRadius: "10px",
                }}
              >
                <CIcon
                  className="sidebar-brand-narrow"
                  icon={cilSearch}
                  height={20}
                  style={{ color: "#000" }}
                />
                <input
                  className="w-100"
                  placeholder="Search"
                  style={{ padding: "2px", outline: "none", border: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3   h-100 ">
          <div className="d-flex justify-content-around  align-items-center  h-100">
            <div className="">
              <NavLink
                onClick={hadleclick}
                className="nalinkk text-light d-none  d-lg-flex"
                exact
                to="/cart"
              >
                <AiOutlineShoppingCart
                  style={{ fontSize: "25px", color: "black" }}
                />
                <p
                  className=" bg-danger rounded-pill p-1 text-black d-none d-lg-flex"
                  style={{ marginRight: "10px", marginLeft: "4px" }}
                >
                  {ca}
                </p>
              </NavLink>
            </div>
            <div className="text-black d-flex align-items-end d-lg-flex">
              {" "}
              |
            </div>
            <div className="spe ">{autbutton}</div>
          </div>
          {/* <div className="d-flex align-items-center d-lg-none">
            <div className="d-flex align-items-center d-lg-none">
              <NavLink
                onClick={hadleclick}
                className="ca text-light d-flex "
                exact
                to="/cart"
              >
                <AiOutlineShoppingCart style={{ fontSize: "20px" }} />
              </NavLink>
              <p className="no bg-danger rounded-pill p-1">{ca}</p>
            </div>

            <div className="icomm  " onClick={hadleclick}>
              <i>{click ? <FaTimes /> : <AiOutlineBars />}</i>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
