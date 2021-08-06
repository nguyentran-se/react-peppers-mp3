import React, { useEffect, useRef, useState } from "react";
import ListCategory from "common/ListCategory/ListCategory";
import musicApi from "api/musicApi";
import "./Cate.scss";
const Cate = (props) => {
   const [listCategory, setListCategory] = useState(null);
   const [playlists, setPlaylists] = useState([]);
   //cancel subcription call api = mountedRef
   const mountedRef = useRef(true);
   useEffect(() => {
      const requestGetAListOfCategories = async () => {
         try {
            const params = {
               country: "VN",
               locale: "en_us",
               limit: 5,
               offset: 0,
            };
            const { categories } = await musicApi.getAListOfCategories(params);
            // console.log(categories);
            const listCategory = {
               items: categories.items,
               next: categories.next,
               previous: categories.previous,
            };
            mountedRef.current && setListCategory(listCategory);
         } catch (error) {
            console.log(error);
         }
      };
      requestGetAListOfCategories();
      return () => {
         mountedRef.current = false;
      };
   }, []);
   useEffect(() => {
      if (listCategory) {
         const params = {
            country: "VN",
            locale: "en_us",
            limit: 5,
            offset: 0,
         };
         const requestGetPlaylists = () => {
            try {
               listCategory.items.map(async (item) => {
                  const { playlists } = await musicApi.getPlaylistsOfCategory(
                     item.id,
                     params
                  );
                  // console.log(playlists);
                  mountedRef.current &&
                     setPlaylists((prevPlaylists) => [
                        ...prevPlaylists,
                        {
                           items: playlists.items,
                           next: playlists.next,
                           previous: playlists.previous,
                        },
                     ]);
               });
            } catch (error) {
               console.log(error);
            }
         };
         // console.log(listCategory);
         requestGetPlaylists();
         return () => {
            mountedRef.current = false;
         };
      }
   }, [listCategory]);
   // console.log(playlists);

   return (
      <div className="category">
         <div className="container category-container">
            <ListCategory
               playlists={playlists}
               listCategory={listCategory?.items}
            />
         </div>
      </div>
   );
};

export default Cate;
