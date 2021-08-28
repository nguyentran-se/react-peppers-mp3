const { default: axiosClient } = require("./axiosClient");
// albums, episode, shows, tracks
const userApi = {
   getCurrentUser: () => {
      const url = `/me`;
      return axiosClient.get(url);
   },

   getTopTracks: (params) => {
      const url = `/me/top/tracks`;
      return axiosClient.get(url, { params });
   },

   getTopArtists: (params) => {
      const url = `/me/top/artists`;
      return axiosClient.get(url, { params });
   },

   getFollowedArtists: (params) => {
      const url = `/me/following`;
      return axiosClient.get(url, { params });
   },

   getUserPlaylists: () => {
      const url = `/me/playlists`;
      return axiosClient.get(url);
   },

   getUserAlBums: () => {
      const url = `/me/albums`;
      return axiosClient.get(url);
   },

   getFavouriteTracks: (params) => {
      const url = `/me/tracks`;
      return axiosClient.get(url, { params });
   },

   checkFavouriteAlbum: (params) => {
      const url = `/me/albums/contains`;
      return axiosClient.get(url, { params });
   },

   followPlaylist: (id) => {
      const url = `/playlists/${id}/followers`;
      return axiosClient.put(url);
   },

   unFollowPlaylist: (id) => {
      const url = `/playlists/${id}/followers`;
      return axiosClient.delete(url);
   },
};

export default userApi;
