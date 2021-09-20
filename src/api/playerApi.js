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

   playURI: (params, option = { uris: null, context_uri: null }) => {
      const url = "/me/player/play";
      return axiosClient({
         method: "PUT",
         params,
         url: url,
         data: JSON.stringify({ ...option }),
      });
   },

   getTracksOfCurrentList: (type, listId) => {
      const url = `${type}s/${listId}/tracks`;
      return axiosClient.get(url);
   },
};

export default playerApi;
