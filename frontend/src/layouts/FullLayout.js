import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
    
      <Header />
      <div className="pageWrapper d-lg-flex">
      
        <aside className="sidebarArea shadow" id="sidebarArea" style={{marginTop: "60px"}}>
          <Sidebar />
        </aside>
       
        <div className="contentArea">
         
          <Container className="p-4" fluid>
            <div style={{marginTop: "60px"}}>
            <Outlet />

            </div>
           
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
