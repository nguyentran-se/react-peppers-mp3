import userApi from "api/userApi";
import * as actionTypes from "./actionTypes";

export const fetchPlaylistsSuccess = (playlists) => ({
   type: actionTypes.FETCH_PLAYLISTS_SUCCESS,
   payload: { playlists },
});

export const fetchAlbumsSuccess = (albums) => ({
   type: actionTypes.FETCH_ALBUMS_SUCCESS,
   payload: { albums },
});

export const fetchPlaylists = () => {
   return async (dispatch) => {
      const { items: playlists } = await userApi.getUserPlaylists();
      const playlistsStore = playlists.map(({ id, name }) => ({
         id,
         name,
      }));
      dispatch(fetchPlaylistsSuccess(playlistsStore));
   };
};

export const fetchAlbums = () => {
   return async (dispatch) => {
      const { items: albums } = await userApi.getUserAlBums();
      const albumsStore = albums.map(({ album }) => ({
         id: album.id,
         name: album.name,
      }));
      dispatch(fetchAlbumsSuccess(albumsStore));
   };
};

export const initFavourite = () => {
   return (dispatch) => {
      dispatch(fetchPlaylists());
      dispatch(fetchAlbums());
   };
};

export const followPlaylist = (id) => {
   return async (dispatch) => {
      await userApi.followPlaylist(id);
      dispatch(fetchPlaylists());
   };
};

export const unFollowPlaylist = (id) => {
   return async (dispatch) => {
      await userApi.unFollowPlaylist(id);
      dispatch(fetchPlaylists());
   };
};
