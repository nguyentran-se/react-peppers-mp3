import Button from "common/UI/Button/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./CategoryHeader.scss";
import PropTypes from "prop-types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const propTypes = {
   categoryHref: PropTypes.any,
   categoryName: PropTypes.string,
   cardLength: PropTypes.number,
   slideIndex: PropTypes.number,
   wrapItems: PropTypes.bool,
};

const CategoryHeader = ({
   categoryHref,
   categoryName,
   cardLength,
   sliderRef,
   slideIndex,
   wrapItems,
}) => {
   return (
      <div className="category-header">
         {cardLength ? (
            categoryHref ? (
               <Link to={categoryHref} className="category-title">
                  {categoryName}
                  <i className={`icon--medium-size ic-go-right`}></i>
               </Link>
            ) : (
               <h3 className="category-title">{categoryName}</h3>
            )
         ) : (
            <h3 className="category-title">
               <SkeletonTheme color={"var(--loading-bg)"}>
                  <Skeleton width={120} height={20} />
               </SkeletonTheme>
            </h3>
         )}

         {cardLength > 5 && wrapItems && (
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
