import React from "react";
import Category from "./Category/Category";
// import { LIST_TOPIC } from "constant";
import "./ListCategory.scss";
import { withRouter } from "react-router-dom";

const ListCategory = ({ playlists, listCategory, match }) => {
   let transformedListCategory;
   if (listCategory) {
      transformedListCategory = listCategory.map((category, index) => (
         <Category
            categoryName={category.name}
            categoryHref={`${match.path}/${category.id}`}
            cards={playlists[index]?.items}
            cardShape={category.shape}
            // isBanner={category.isBanner}
            key={category.id}
         />
      ));
   }

   return <div className="list-category">{transformedListCategory}</div>;
};

export default withRouter(ListCategory);
