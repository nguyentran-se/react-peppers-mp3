import React from "react";
import ListCategory from "common/ListCategory/ListCategory";
import Banner from "./components/Banner/Banner";
import "./Home.scss";
const Home = (props) => {
   return (
      <div className="home">
         <div className="container home-container">
            <Banner />
            <ListCategory />
         </div>
      </div>
   );
};

export default Home;
