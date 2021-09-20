const url = new URL("https://accounts.spotify.com/authorize");

const scopes = [
   "streaming",
   "user-read-email",
   "user-read-private",
   "user-library-read",
   "user-library-modify",
   "user-read-playback-state",
   "user-modify-playback-state",
   "user-follow-read",
   "user-follow-modify",
   "user-top-read",
   "playlist-read-private",
   "playlist-read-collaborative",
   "playlist-modify-public",
   "playlist-modify-private",
   "user-read-recently-played",
];

const params = {
   client_id: process.env.REACT_APP_CLIENT_ID,
   response_type: "code",
   redirect_uri: "http://localhost:3000/",
   scope: scopes.join(" "),
   state: "34fFs29kd09",
   show_dialog: true,
};

url.search = new URLSearchParams(params);

export const AUTHORIZE_URL = url.toString();
