import React from "react";
import Category from "./Category/Category";
import { withRouter } from "react-router-dom";

const ListCategory = ({
   playlists,
   listCategory,
   match,
   wrapItems,
   themeButton,
}) => {
   let transformedListCategory;
   if (listCategory) {
      transformedListCategory = listCategory.map((category, index) => (
         <Category
            categoryName={category.name}
            categoryHref={category.customHref ?? `${match.path}/${category.id}`}
            cards={category.cards || playlists[index]?.items}
            cardShape={category.shape}
            // isBanner={category.isBanner}
            oneButton={category?.oneButton}
            key={category.id}
            wrapItems={wrapItems}
            themeButton={themeButton}
         />
      ));
   }

   return <div className="list-category">{transformedListCategory}</div>;
};

export default withRouter(ListCategory);
