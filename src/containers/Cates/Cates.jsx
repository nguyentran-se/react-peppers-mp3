import React, { useEffect, useRef, useState } from "react";
import ListCategory from "common/ListCategory/ListCategory";
import musicApi from "api/musicApi";
import "./Cates.scss";
const Cates = (props) => {
   const [listCategory, setListCategory] = useState({
      items: [],
      next: null,
      previous: null,
   });
   const [playlists, setPlaylists] = useState([]);
   const [loadMore, setLoadMore] = useState(true);
   //cancel subcription useState and call api = mountedRef
   const mountedRef = useRef(true);
   //scroll to end and hasNextLink, then setLoadMore(true)
   useEffect(() => {
      const layoutRight = document.querySelector(".layout-right");
      const scrollHandler = () => {
         const scrollHeight = layoutRight.scrollHeight;
         const scrollTop = layoutRight.scrollTop;
         const clientHeight = layoutRight.clientHeight;
         //scrollTop + clientHeight >= scrollHeight - 300 if want loadMore sooner
         if (scrollTop + clientHeight === scrollHeight && listCategory.next)
            setLoadMore(true);
      };
      layoutRight.addEventListener("scroll", scrollHandler);
      return () => {
         layoutRight.removeEventListener("scroll", scrollHandler);
      };
   }, [listCategory.next]);

   //unmouted suddenlly, then not update state
   useEffect(() => {
      return () => {
         mountedRef.current = false;
      };
   }, []);

   //handle call api at first time and 'next' call if scroll to end
   useEffect(() => {
      const requestGetAListOfCategories = async () => {
         try {
            const catesParams = {
               country: "VN",
               locale: "en_us",
               limit: 5,
               offset: 0,
            };
            //call api categories-next if has
            const { categories } = listCategory.next
               ? await musicApi.getNext(listCategory.next)
               : await musicApi.getAListOfCategories(catesParams);

            const playlistsParams = {
               country: "VN",
               locale: "en_us",
               limit: 5,
               offset: 0,
            };
            // call api playlists by loop in each category
            const requests = categories.items.map(async (item) => {
               //return array of promises
               return musicApi.getPlaylistsOfCategory(item.id, playlistsParams);
            });
            // const results = await Promise.all(requests); SLOWER
            // handle all promises in Promise.all and update into state playlists
            Promise.all(requests).then((results) =>
               results.map(
                  ({ playlists }) =>
                     mountedRef.current &&
                     setPlaylists((prevPlaylists) => [
                        ...prevPlaylists,
                        {
                           items: playlists.items,
                           next: playlists.next,
                           previous: playlists.previous,
                        },
                     ])
               )
            );
            const updatedListCategory = {
               items: [...listCategory.items, ...categories.items],
               next: categories.next,
               previous: categories.previous,
            };

            mountedRef.current && setLoadMore(false);
            mountedRef.current && setListCategory(updatedListCategory);
         } catch (error) {
            console.log(error);
         }
      };
      // at first time initial loadmore is true then call api
      // after that, must scroll to end and hasNextLink to update loadmore to true
      if (loadMore) {
         requestGetAListOfCategories();
      }
      return () => {};
   }, [loadMore, listCategory]);

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

export default Cates;
