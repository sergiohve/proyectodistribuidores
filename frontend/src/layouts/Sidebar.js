import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Alcymar from "../assets/images/users/alcymar.png";
import Edson from "../assets/images/users/Edson.png";
import React, { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import roles from "../helpers/roles";




const Sidebar = () => {
  
  const {  email, user}=useContext(AuthContext);
  console.log(email.email)
 
    const navigation = [
    {
      title: "Todos los empleos",
      href: "/todosempleos",
      icon: "bi bi-bell",
    },

    {
      title: "Mis suscripciones",
      href: "/suscripciones",
      icon: "bi bi-card-text",
    },
   
    
  ]
  const navigation1 = [
    {
      title: "Publicar empleo",
      href: "/empleo",
      icon: "bi bi-speedometer2",
    },
    {
      title: "Empleos publicados",
      href: "/empleospublicados",
      icon: "bi bi-speedometer2",
    },
  ];

  
  
  
  const showMobilemenu = () => {
   
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
   
  return (
    <div >
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
       
      >
        <div className="p-3 d-flex">
          <img src={email.email=="eddsonh@gmail.com" ? Edson : Alcymar} alt="user" width="120"  className="rounded-circle" style={{marginLeft: "auto", marginRight: "auto"}} />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75 center" style={{textAlign: "center"}}>{email.email}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
        
          {email.email=="eddsonh@gmail.com" ?  navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          )) : ""}
          
          
          {email.email=="alysmaralejandra@gmail.com" ? navigation1.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          )) : ""}
         

              
       
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
