import userApi from "api/userApi";
import ListCategory from "common/ListCategory/ListCategory";
import PlaylistSongs from "containers/Playlist/components/PlaylistSongs/PlaylistSongs";
// import Category from "common/ListCategory/Category/Category";
import React, { useEffect, useState } from "react";
import "./General.scss";
const General = () => {
   const [topTracks, setTopTracks] = useState();
   const [topArtists, setTopArtists] = useState();
   const [following, setFollowing] = useState();
   useEffect(() => {
      const requestData = async () => {
         const topTracksParams = {
            limit: 5,
            offset: 0,
         };
         const followingParams = {
            type: "artist",
         };
         const tracks = userApi.getTopTracks(topTracksParams);
         const artists = userApi.getTopArtists();
         const following = userApi.getFollowedArtists(followingParams);
         Promise.all([tracks, artists, following]).then((results) => {
            const tracks = results[0];
            const artists = results[1];
            const following = results[2].artists;
            const updatedTracks = {
               items: tracks.items,
               next: tracks.next,
               previous: tracks.previous,
            };
            const updatedArtists = {
               items: artists.items,
               next: artists.next,
               previous: artists.previous,
            };
            const updatedFollowing = {
               items: following.items,
               next: following.next,
               // previous: following.previous,
            };
            setFollowing(updatedFollowing);
            setTopArtists(updatedArtists);
            setTopTracks(updatedTracks);
         });
      };
      requestData();
      return () => {};
   }, []);
   // console.log("RENDERING");
   const listSection = [
      {
         name: "Your top artists",
         customHref: false,
         cards: topArtists?.items,
         shape: "circle",
         oneButton: true,
         id: 1,
      },
      {
         name: "Your following",
         customHref: false,
         cards: following?.items,
         shape: "circle",
         oneButton: true,
         id: 2,
      },
   ];

   return (
      <div className="general">
         <div className="general-songs">
            <h3 className="category-title">Your top tracks</h3>
            <PlaylistSongs
               songs={topTracks?.items}
               customInstance={{
                  noHeader: true,
               }}
            />
         </div>
         {listSection[0].cards && <ListCategory listCategory={listSection} />}
      </div>
   );
};

export default General;
