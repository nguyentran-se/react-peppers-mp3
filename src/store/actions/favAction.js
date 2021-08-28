import userApi from "api/userApi";
import * as actionTypes from "./actionTypes";

export const initPlaylists = (playlists) => ({
   type: actionTypes.INIT_PLAYLISTS_SUCCESS,
   payload: { playlists },
});
export const initAlbums = (albums) => ({
   type: actionTypes.INIT_ALBUMS_SUCCESS,
   payload: { albums },
});

export const initFavourite = () => {
   return async (dispatch) => {
      try {
         const { items: playlists } = await userApi.getUserPlaylists();
         const { items: albums } = await userApi.getUserAlBums();
         const playlistsStore = playlists.map(({ id, name }) => ({
            id,
            name,
         }));
         const albumsStore = albums.map(({ album }) => ({
            id: album.id,
            name: album.name,
         }));
         dispatch(initPlaylists(playlistsStore));
         dispatch(initAlbums(albumsStore));
      } catch (error) {}
   };
};

export const followPlaylist = (id) => {
   return async (dispatch) => {
      await userApi.followPlaylist(id);
      dispatch(initFavourite());
   };
};

export const unFollowPlaylist = (id) => {
   return async (dispatch) => {
      await userApi.unFollowPlaylist(id);
      dispatch(initFavourite());
   };
};
