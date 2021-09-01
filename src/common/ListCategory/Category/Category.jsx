import ListCard from "common/ListCard/ListCard";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
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
   //pass to forwardRef(ListCard) to get ref, then pass to CategoryHeader
   const sliderRef = useRef(null);

   const [slideIndex, setSlideIndex] = useState(0);

   //handle slide after change to disable button based on current index when can not slide
   const afterChangeHandler = (index) => {
      setSlideIndex(index);
   };

   return (
      <div className="category">
         {categoryName && (
            <CategoryHeader
               categoryHref={categoryHref}
               categoryName={categoryName}
               cardLength={cards?.length}
               sliderRef={sliderRef}
               slideIndex={slideIndex}
            />
         )}
         <ListCard
            ref={sliderRef}
            cards={cards}
            cardShape={cardShape}
            oneButton={oneButton}
            afterChangeHandler={afterChangeHandler}
         />
      </div>
   );
};

Category.propTypes = propTypes;

export default Category;
