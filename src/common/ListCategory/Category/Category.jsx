import ListCard from "common/ListCard/ListCard";
import PropTypes from "prop-types";
import React from "react";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import "./Category.scss";
const propTypes = {
   categoryName: PropTypes.string,
   categoryHref: PropTypes.any,
   cards: PropTypes.array,
   cardShape: PropTypes.string,
   oneButton: PropTypes.bool,
};
const Category = ({
   categoryName,
   categoryHref,
   cards,
   cardShape,
   oneButton,
}) => {
   return (
      <div className="category">
         {categoryName && (
            <CategoryHeader
               categoryHref={categoryHref}
               categoryName={categoryName}
               cardLength={cards?.length}
            />
         )}
         <ListCard cards={cards} cardShape={cardShape} oneButton={oneButton} />
      </div>
   );
};

Category.propTypes = propTypes;

export default Category;
