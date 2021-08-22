import React, { useEffect, useState } from "react";
import musicApi from "api/musicApi";
import ListCard from "common/ListCard/ListCard";
import Button from "common/UI/Button/Button";
import PlaylistThumbnail from "containers/Playlist/components/PlaylistThumbnail/PlaylistThumbnail";
import { useParams } from "react-router-dom";
import "./Cate.scss";
import { useCheckMounted, useScrollLoadMore } from "hooks";
const Cate = () => {
   const { slug } = useParams();
   const [cate, setCate] = useState();
   const [playlistsOfCate, setPlaylistsOfCate] = useState({
      items: [],
      next: null,
      previous: null,
   });
   const [loadMore, setLoadMore] = useScrollLoadMore(playlistsOfCate.next);
   const isMounted = useCheckMounted();

   useEffect(() => {
      const requestGetData = async () => {
         const cateParams = {
            country: "VN",
            locale: "en_us",
         };
         const playlistsParams = {
            country: "VN",
            locale: "en_us",
            limit: 20,
            offset: 0,
         };
         // category
         let data;
         if (playlistsOfCate?.next) {
            data = await musicApi.getNext(playlistsOfCate.next);
         } else {
            const cate = await musicApi.getSpecificCategory(slug, cateParams);
            isMounted && setCate(cate);
            data = await musicApi.getPlaylistsOfCategory(slug, playlistsParams);
         }

         const { playlists } = data;
         // add more playlists
         const updatedPlaylists = {
            items: [...playlistsOfCate.items, ...playlists.items],
            next: playlists.next,
            previous: playlists.previous,
         };
         // console.log(cate);
         isMounted && setPlaylistsOfCate(updatedPlaylists);
      };
      if (loadMore) {
         requestGetData();
         setLoadMore(false);
      }
   }, [slug, playlistsOfCate, loadMore, setLoadMore, isMounted]);

   return (
      <div className="cate">
         <div className="container cate-container">
            <div className="cate-intro">
               <PlaylistThumbnail
                  image={cate?.icons[0].url}
                  custom="cate-img"
               />
               <div className="cate-right">
                  <h2 className="cate-intro__title">{cate?.name}</h2>
                  <div className="cate-buttons">
                     <Button icon="ic-play" custom="button--normal">
                        PHÁT NHẠC
                     </Button>
                     <Button icon="ic-addfriend" custom="button--normal">
                        QUAN TÂM
                     </Button>
                  </div>
               </div>
            </div>
            <div className="cate-playlists">
               <ListCard cards={playlistsOfCate?.items} wrapItems />
            </div>
         </div>
      </div>
   );
};

export default Cate;

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
//       if (scrollTop + clientHeight === scrollHeight && playlistsOfCate.next)
//          setLoadMore(true);
//    };
//    layoutRight.addEventListener("scroll", scrollHandler);
//    return () => {
//       layoutRight.removeEventListener("scroll", scrollHandler);
//    };
// }, [playlistsOfCate]);
