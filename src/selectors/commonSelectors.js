// auth select
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// user select
export const selectName = (state) => state.user.displayName;
export const selectFollowers = (state) => state.user.followers;
export const selectImage = (state) => state.user.image;

//fav select
export const selectPlaylists = (state) => state.fav.playlists;
export const selectAlbums = (state) => state.fav.albums;
export const selectTracks = (state) => state.fav.tracks;

//player select
export const selectCurrentTrack = (state) => state.player.currentTrack;
export const selectPaused = (state) => state.player.paused;
export const selectDeviceId = (state) => state.player.deviceId;
export const selectPlayer = (state) => state.player.player;
