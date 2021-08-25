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
};

export default userApi;
