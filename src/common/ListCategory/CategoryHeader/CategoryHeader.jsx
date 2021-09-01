import Button from "common/UI/Button/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./CategoryHeader.scss";
import PropTypes from "prop-types";

const propTypes = {
   categoryHref: PropTypes.any,
   categoryName: PropTypes.string,
   cardLength: PropTypes.number,
   slideIndex: PropTypes.number,
};

const CategoryHeader = ({
   categoryHref,
   categoryName,
   cardLength,
   sliderRef,
   slideIndex,
}) => {
   return (
      <div className="category-header">
         {categoryHref ? (
            <Link to={categoryHref} className="category-title">
               {categoryName}
               <i className={`icon--medium-size ic-go-right`}></i>
            </Link>
         ) : (
            <h3 className="category-title">{categoryName}</h3>
         )}

         {cardLength > 5 && (
            <div className="category-header__icons">
               <Button
                  icon="icon--medium-size ic-go-left"
                  custom={slideIndex === 0 ? "disabled" : ""}
                  clicked={() => sliderRef.current.slickPrev()}
               />
               <Button
                  icon="icon--medium-size ic-go-right"
                  custom={
                     slideIndex === cardLength - 5 ||
                     slideIndex === cardLength - 4
                        ? "disabled"
                        : ""
                  }
                  clicked={() => sliderRef.current.slickNext()}
               />
            </div>
         )}
      </div>
   );
};

CategoryHeader.propTypes = propTypes;

export default CategoryHeader;
