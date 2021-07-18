import React from "react";
import Banner from "./components/Banner/Banner";
import ListTopic from "./components/ListTopic/ListTopic";
import "./Home.scss";
const Home = (props) => {
   return (
      <div className="home">
         <div className="container home-container">
            <Banner />
            <ListTopic />
         </div>
      </div>
   );
};

export default Home;
