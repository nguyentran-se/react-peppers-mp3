import artistApi from "api/artistApi";
import ListCategory from "common/ListCategory/ListCategory";
import NestedNav from "common/NestedNav/NestedNav";
import PlaylistSongs from "containers/Playlist/components/PlaylistSongs/PlaylistSongs";
import PlaylistThumbnail from "containers/Playlist/components/PlaylistThumbnail/PlaylistThumbnail";
import { uniqBy } from "lodash/array";
import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Artist.scss";
import ArtistIntro from "./Components/ArtistIntro/ArtistIntro";

const Artist = () => {
   const { slug } = useParams();
   const matchPath = useRouteMatch().url;
   const [artist, setArtist] = useState();
   const [topTracks, setTopTracks] = useState([]);
   const [artistAlbums, setArtistAlbums] = useState();
   const [relatedArtist, setRelatedArtist] = useState([]);
   // const slugRef = useRef(slug);
   const nestedNavList = [
      { name: "TỔNG QUAN", href: matchPath },
      { name: "HOẠT ĐỘNG", href: matchPath + "/feed" },
      { name: "SỰ KIỆN", href: matchPath + "/event" },
      { name: "BÀI HÁT", href: matchPath + "/bai-hat" },
      { name: "MV", href: matchPath + "/video" },
      { name: "RADIO", href: matchPath + "/radio" },
      { name: "TIN TỨC", href: matchPath + "/news" },
   ];
   let artistSingle, artistAlbum;
   //filter artistAlbums from api into single and album
   if (artistAlbums) {
      artistSingle = artistAlbums.items.filter(
         (album) => album.albumType === "single"
      );
      artistSingle = uniqBy(artistSingle, "name");
      artistAlbum = artistAlbums.items.filter(
         (album) => album.albumType === "album"
      );
      artistAlbum = uniqBy(artistAlbum, "name");
   }
   // call api: artist, top-tracks, albums, relatedArtists
   useEffect(() => {
      const layoutRight = document.querySelector(".layout-right");
      layoutRight.scrollTop = 0;
      const requestData = async () => {
         try {
            const topTracksParams = {
               market: "VN",
            };
            const artist = artistApi.getSpecificArtist(slug);
            const artistTopTracks = artistApi.getArtistTopTracks(
               slug,
               topTracksParams
            );
            const artistAlbums = artistApi.getArtistAlbums(slug);
            const relatedArtist = artistApi.getArtistsRelatedArtist(slug);
            Promise.all([
               artist,
               artistTopTracks,
               artistAlbums,
               relatedArtist,
            ]).then((results) => {
               console.log(results);
               setArtist(results[0]);
               setTopTracks(results[1].tracks);
               setArtistAlbums({
                  items: results[2].items,
                  previous: results[2].previous,
                  next: results[2].next,
               });
               setRelatedArtist(results[3].artists);
            });
         } catch (error) {
            console.log(error);
         }
      };
      requestData();
   }, [slug]);

   // console.log(artist);
   // console.log(topTracks);
   // console.log(artistSingle);
   // console.log(artistAlbums);
   // render listSection, pass to ListCategory
   const listSection = [
      {
         name: "Single",
         customHref: `${matchPath}/discography/single`,
         cards: artistSingle,
         sectionClass: "artist-single",
         id: 1,
      },
      {
         name: "Album",
         customHref: `${matchPath}/discography/album`,
         cards: artistAlbum,
         sectionClass: "artist-album",
         id: 2,
      },
      {
         name: "Bạn có thể thích",
         customHref: null,
         cards: relatedArtist,
         sectionClass: "artist-artists",
         shape: "circle",
         oneButton: true,
         id: 3,
      },
   ];
   return (
      <div className="artist">
         <div
            className="artist-bg"
            style={{
               backgroundImage: `url(${artist?.images?.[0].url})`,
            }}></div>
         <div className="container artist-container">
            <ArtistIntro
               name={artist?.name}
               followers={artist?.followers.total}
               genres={artist?.genres}
               image={artist?.images?.[0].url}
               popularity={artist?.popularity}
            />
            <div className="artist-main">
               <NestedNav nestedNavList={nestedNavList} />
               <div className="artist-outstanding">
                  <h2 className="artist-main__heading">Bài hát nổi bật</h2>
                  <div className="artist-outstanding__wrapper">
                     <PlaylistThumbnail
                        image={topTracks?.[0]?.album.images[0].url}
                        custom={"artist-img"}
                     />
                     <PlaylistSongs
                        songs={topTracks}
                        customInstance={{
                           customClass: "artist-outstanding__songs",
                           noHeader: true,
                        }}
                     />
                  </div>
               </div>
               {listSection[0].cards && (
                  <ListCategory listCategory={listSection} />
               )}
            </div>
         </div>
      </div>
   );
};

export default Artist;
