import userApi from "api/userApi";
import { batch } from "react-redux";
import * as actionTypes from "./actionTypes";

const fetchPlaylistsSuccess = (playlists) => ({
   type: actionTypes.FETCH_PLAYLISTS_SUCCESS,
   payload: { playlists },
});

const fetchAlbumsSuccess = (albums) => ({
   type: actionTypes.FETCH_ALBUMS_SUCCESS,
   payload: { albums },
});

export const fetchTracksSuccess = (tracks) => ({
   type: actionTypes.FETCH_TRACKS_SUCCESS,
   payload: { tracks },
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

export const fetchTracks = () => {
   return async (dispatch) => {
      const { items: tracks } = await userApi.getFavouriteTracks();
      const tracksStore = tracks.map(({ track }) => track.id);
      dispatch(fetchTracksSuccess(tracksStore));
   };
};

export const initFavourite = () => {
   return (dispatch) => {
      batch(() => {
         dispatch(fetchPlaylists());
         dispatch(fetchAlbums());
         dispatch(fetchTracks());
      });
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

export const followAlbum = (id) => {
   return async (dispatch) => {
      await userApi.followAlbum(id);
      dispatch(fetchAlbums());
   };
};

export const unFollowAlbum = (id) => {
   return async (dispatch) => {
      await userApi.unFollowAlbum(id);
      dispatch(fetchAlbums());
   };
};

export const followTrack = (id) => {
   return async (dispatch) => {
      await userApi.followTrack(id);
      dispatch(fetchTracks());
   };
};

export const unFollowTrack = (id) => {
   return async (dispatch) => {
      await userApi.unFollowTrack(id);
      dispatch(fetchTracks());
   };
};
