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

   playURI: (params, uri) => {
      const url = "/me/player/play";
      return axiosClient({
         method: "PUT",
         params,
         url: url,
         data: JSON.stringify({ uris: [uri] }),
      });
   },
};

export default playerApi;
