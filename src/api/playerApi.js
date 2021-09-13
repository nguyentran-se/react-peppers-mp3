import axiosClient from "./axiosClient";

const playerApi = {
   getCurrentPlayback: () => {
      const url = `/me/player`;
      return axiosClient.get(url);
   },

   getCurrentPlayingTrack: () => {
      const url = `/me/player/currently-playing`;
      return axiosClient.get(url);
   },

   getRecentlyPlayedTracks: (params) => {
      const url = `/me/player/recently-played`;
      return axiosClient.get(url, { params });
   },
};

export default playerApi;
