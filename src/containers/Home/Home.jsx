import React from "react";
// import ListCategory from "common/ListCategory/ListCategory";
import "./Home.scss";
import Banner from "./components/Banner/Banner";
const Home = (props) => {
   return (
      <div className="home">
         <div className="container home-container">
            <Banner />
            {/* <ListCategory /> */}
         </div>
      </div>
   );
};

export default Home;
