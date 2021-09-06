import ListCategory from "common/ListCategory/ListCategory";
import PlaylistSongs from "common/PlaylistSongs/PlaylistSongs";
import PlaylistThumbnail from "containers/Playlist/components/PlaylistThumbnail/PlaylistThumbnail";
import React from "react";

const ArtistGeneral = ({ image, songs, listSection }) => {
   return (
      <>
         <div className="artist-outstanding">
            <h2 className="artist-main__heading">Bài hát nổi bật</h2>
            <div className="artist-outstanding__wrapper">
               <PlaylistThumbnail image={image} custom={"artist-img"} />
               <PlaylistSongs
                  songs={songs}
                  customInstance={{
                     customClass: "artist-outstanding__songs",
                     noHeader: true,
                  }}
               />
            </div>
         </div>
         {listSection?.[0].cards && <ListCategory listCategory={listSection} />}
      </>
   );
};

export default ArtistGeneral;
