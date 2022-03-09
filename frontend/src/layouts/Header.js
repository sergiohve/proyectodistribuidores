import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Alcymar from "../assets/images/users/alcymar.png";
import { AuthContext } from "../auth/authContext";
import { useForm } from "../hooks/useForm";
import Edson from "../assets/images/users/Edson.png";
import { types } from "../types/types";


const Header = () => {
  const [dolars, setDolars]= useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const  [values, handleInputChange, reset, setValues] = useForm();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {email, dispatch}=useContext(AuthContext);
  console.log(email)

  

   
  console.log(dolars)
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const handleLogout=()=>{
 
    const action= {
      type: types.logout,
     
    }
    dispatch(action);
     navigate("/login", {
      replace:true
    })
  
  
   }
  return (
    <Navbar color="primary" dark expand="md" className="fix-header" style={{position: "fixed", width: "100%", zIndex: 20}}>
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3" style={{color: "white"}}>
          Sistemas distribuidos 
        </div>
       
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
       
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginLeft: "auto", right: 0}}>
          <DropdownToggle color="transparent">
         
            <img
             src={email.email=="eddsonh@gmail.com" ? Edson : Alcymar}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
           
            <DropdownItem>{email.email}</DropdownItem>
           
            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Cerrar Sesión</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
