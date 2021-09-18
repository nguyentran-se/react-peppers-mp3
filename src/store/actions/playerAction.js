import playerApi from "api/playerApi";
import { getLocalStorage } from "helper";
import * as actionTypes from "./actionTypes";
const setPlayerStatus = (player, device_id, status) => {
   return {
      type: actionTypes.SET_PLAYER_STATUS,
      payload: { deviceId: device_id, status, player },
   };
};
const setCurrentTrack = (currentTrack) => {
   return { type: actionTypes.SET_CURRENT_TRACK, payload: { currentTrack } };
};
const paused = (paused) => {
   return { type: actionTypes.PAUSED, payload: { paused } };
};
export const initPlayer = () => {
   return (dispatch) => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
         const player = new window.Spotify.Player({
            name: "Peppers player",
            getOAuthToken: (cb) => {
               cb(getLocalStorage("USER").accessToken);
            },
            volume: 0.5,
         });
         // console.log(player);
         player.addListener("ready", ({ device_id }) => {
            dispatch(setPlayerStatus(player, device_id, "READY"));
            const params = {
               device_id,
            };
            playerApi.playURI(params, "spotify:track:42pZsfo15M63tgCpDeGCx6");
         });

         player.addListener("not_ready", ({ device_id }) => {
            dispatch(setPlayerStatus(device_id, "NOT READY"));
         });

         player.addListener("player_state_changed", (state) => {
            if (!state) {
               return;
            }
            dispatch(setCurrentTrack(state.track_window.current_track));
            dispatch(paused(state.paused));
            // player.getCurrentState().then((state) => {
            //    !state ? setActive(false) : setActive(true);
            //    console.log(state);
            // });
         });
         player.connect();
      };
   };
};

// export const seekPlayer = (value) => {
//    player.seek(value);
// };

// export const togglePlay = () => {
//    return (dispatch) => {
//       player.togglePlay();
//    };
// };

// export const previousTrack = () => {
//    return (dispatch) => {
//       player.previousTrack();
//    };
// };
// export const nextTrack = () => {
//    return (dispatch) => {
//       player.nextTrack();
//    };
// };
