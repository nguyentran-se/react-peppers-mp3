import React from "react";
import ListCard from "common/ListCard/ListCard";
import "./Category.scss";
import MyIcon from "common/UI/MyIcon/MyIcon";
import { Link } from "react-router-dom";

const Category = ({
   categoryName,
   categoryHref,
   cards,
   cardShape,
   isBanner,
}) => {
   return (
      <>
         {!isBanner && (
            <div className="category">
               {categoryName && (
                  <div className="category-header">
                     {categoryHref ? (
                        <Link to={categoryHref} className="category-title">
                           {categoryName}
                           <i className={`icon--medium-size ic-go-right`}></i>
                        </Link>
                     ) : (
                        <h3 className="category-title">{categoryName}</h3>
                     )}
                     <div className="category-header__icons">
                        <MyIcon
                           listIcon={["ic-go-left", "ic-go-right"]}
                           customIcon="icon--medium-size"
                           typeWrapper="div"
                        />
                     </div>
                  </div>
               )}
               <ListCard cards={cards} cardShape={cardShape} />
            </div>
         )}
      </>
   );
};

export default Category;
