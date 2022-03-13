import React, { useEffect, useState } from "react";
import musicApi from "api/musicApi";
import ListCategory from "common/ListCategory/ListCategory";
import { useCheckMounted, useScrollLoadMore } from "hooks";
import "./Cates.scss";
import GeneralHelmet from "common/GeneralHelmet/GeneralHelmet";
import { SEO } from "constant";
/**
 * Cates: get listCategory then fetch playlists for each category.
 * update cates and playlists(add more) for each scroll to end.
 */
const Cates = (props) => {
  const [listCategory, setListCategory] = useState({
    items: [],
    next: null,
    previous: null,
  });
  const [playlists, setPlaylists] = useState([]);

  //cancel subcription useState and call api by mountedRef. unmouted suddenlly, then not update state
  const isMounted = useCheckMounted();
  const [loadMore, setLoadMore] = useScrollLoadMore(listCategory.next);

  /**
   * @implements handle call api at first time and 'next' call if scroll to end
   */
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
          limit: 10,
          offset: 0,
        };
        // call api playlists by loop in each category
        const requests = categories.items.map(async (item) => {
          //return array of promises
          return musicApi.getPlaylistsOfCategory(item.id, playlistsParams);
        });
        // const results = await Promise.all(requests); SLOWER
        // handle all promises in Promise.all and update into state playlists
        // update Playlists (add more)
        Promise.all(requests).then((results) =>
          results.map(
            ({ playlists }) =>
              isMounted &&
              playlists.items.length > 0 &&
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

        // mountedRef.current && setLoadMore(false);
        isMounted && setListCategory(updatedListCategory);
      } catch (error) {
        console.log(error);
      }
    };
    // at first time initial loadmore is true then call api
    // after that, must scroll to end and hasNextLink to update loadmore to true
    if (loadMore) {
      requestGetAListOfCategories();
      setLoadMore(false);
    }
  }, [listCategory, loadMore, setLoadMore, isMounted]);

  return (
    <div className="category">
      <GeneralHelmet
        page={{
          title: SEO.cates.title,
          description: SEO.cates.description,
        }}></GeneralHelmet>
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

// const mountedRef = useRef(true);
// useEffect(() => {
//    return () => {
//       mountedRef.current = false;
//    };
// }, []);

// const [loadMore, setLoadMore] = useState(true);
// useEffect(() => {
//    const layoutRight = document.querySelector(".layout-right");
//    const scrollHandler = () => {
//       const scrollHeight = layoutRight.scrollHeight;
//       const scrollTop = layoutRight.scrollTop;
//       const clientHeight = layoutRight.clientHeight;
//       //scrollTop + clientHeight >= scrollHeight - 300 if want loadMore sooner
//       if (scrollTop + clientHeight === scrollHeight && listCategory.next)
//          setLoadMore(true);
//    };
//    layoutRight.addEventListener("scroll", scrollHandler);
//    return () => {
//       layoutRight.removeEventListener("scroll", scrollHandler);
//    };
// }, [listCategory.next]);
