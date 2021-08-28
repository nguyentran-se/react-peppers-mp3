import Header from "common/Header/Header";
import Sidebar from "common/Navigation/Sidebar/Sidebar";
import Player from "common/PLayer/Player";
import Queue from "common/Queue/Queue";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "selectors";
import { selectAlbums, selectPlaylists } from "selectors/commonSelectors";
import { initFavourite } from "store/actions";
import "./PublicLayout.scss";
const PublicLayout = (props) => {
   const [toggleQueue, setToogleQueue] = useState(false);
   // const [navPlaylists, setNavPlaylists] = useState();
   const layoutRightRef = useRef(null);
   const headerRef = useRef(null);

   const dispatch = useDispatch();
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const playlists = useSelector(selectPlaylists);
   const albums = useSelector(selectAlbums);

   //scroll then justify header style
   useEffect(() => {
      const layoutRight = layoutRightRef.current;
      const onscrollHandler = () => {
         const positionScroll = layoutRight.scrollTop;
         if (headerRef) {
            if (positionScroll === 0) {
               headerRef.current.style.boxShadow = "none";
               headerRef.current.style.backgroundColor = "transparent";
            } else {
               headerRef.current.style.boxShadow =
                  "0 3px 5px rgba(0, 0, 0, 0.1)";
               headerRef.current.style.backgroundColor = "inherit";
            }
         }
      };
      layoutRight.addEventListener("scroll", onscrollHandler);
      return () => {
         layoutRight.removeEventListener("scroll", onscrollHandler);
      };
   }, []);

   // get playlists render to sidebar
   useEffect(() => {
      if (isLoggedIn) {
         dispatch(initFavourite());
      }
   }, [isLoggedIn, dispatch]);

   const clickedHandler = useCallback(() => {
      setToogleQueue((prevOpen) => !prevOpen);
   }, []);

   let navPlaylists = null;
   if (isLoggedIn) {
      navPlaylists = playlists.map(({ id, name }) => ({
         title: name,
         link: `/playlist/${id}`,
      }));
      const navAlbums = albums.map(({ id, name }) => ({
         title: name,
         link: `/album/${id}`,
      }));
      navPlaylists = navPlaylists.concat(navAlbums);
   }

   return (
      <div className="layout">
         <div className="layout-wrapper">
            <div className="layout-left">
               <Sidebar navPlaylists={navPlaylists} isLoggedIn={isLoggedIn} />
            </div>
            <div className="layout-right" ref={layoutRightRef}>
               <Header headerRef={headerRef} />
               <main>{props.children}</main>
               <Queue toggleQueue={toggleQueue} />
            </div>
         </div>
         <Player clicked={clickedHandler} toggleQueue={toggleQueue} />
      </div>
   );
};

export default PublicLayout;
