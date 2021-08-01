import React from "react";
import ListCard from "common/ListCard/ListCard";
import "./Category.scss";
import { Link } from "react-router-dom";
import Button from "common/UI/Button/Button";

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
                        <Button icon="icon--medium-size ic-go-left" />
                        <Button icon="icon--medium-size ic-go-right" />
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
