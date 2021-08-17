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
};

export default musicApi;
