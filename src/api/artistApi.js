import axiosClient from "./axiosClient";
const artistApi = {
   getSpecificArtist: (artistId, params) => {
      const url = `/artists/${artistId}`;
      return axiosClient.get(url, { params });
   },
   getArtistTopTracks: (artistId, params) => {
      const url = `artists/${artistId}/top-tracks`;
      return axiosClient.get(url, { params });
   },
   getArtistAlbums: (artistId, params) => {
      const url = `artists/${artistId}/albums`;
      return axiosClient.get(url, { params });
   },
   getArtistsRelatedArtist: (artistId, params) => {
      const url = `artists/${artistId}/related-artists`;
      return axiosClient.get(url, { params });
   },
};

export default artistApi;
