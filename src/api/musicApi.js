import axiosClient from "./axiosClient";
const musicApi = {
   getAListOfCategories: (params) => {
      const url = "/browse/categories";
      return axiosClient.get(url, { params });
   },

   getPlaylistsOfCategory: (categoryId, params) => {
      const url = `/browse/categories/${categoryId}/playlists`;
      return axiosClient.get(url, { params });
   },

   getSpecificPlaylist: (playlistId, params) => {
      const url = `/playlists/${playlistId}`;
      return axiosClient.get(url, { params });
   },

   getNext: (url) => {
      return axiosClient.get(url);
   },

   getSpecificAlbum: (albumId, params) => {
      const url = `/albums/${albumId}`;
      return axiosClient.get(url, { params });
   },

   getSpecificCategory: (categoryId, params) => {
      const url = `/browse/categories/${categoryId}`;
      return axiosClient.get(url, { params });
   },

   getNewReleases: (params) => {
      const url = `/browse/new-releases`;
      return axiosClient.get(url, { params });
   },

   getFeaturedPlaylists: (params) => {
      const url = `/browse/featured-playlists`;
      return axiosClient.get(url, { params });
   },

   search: (params) => {
      const url = `/search`;
      return axiosClient.get(url, { params });
   },
};

export default musicApi;
