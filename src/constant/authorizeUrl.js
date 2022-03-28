const url = new URL("https://accounts.spotify.com/authorize");
const PRODUCTION_URL = "https://peppersmp3.netlify.app/";
const DEVELOPMENT_URL = "http://localhost:3000/";
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
  redirect_uri:
    process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEVELOPMENT_URL,
  scope: scopes.join(" "),
  state: "34fFs29kd09",
  show_dialog: true,
};

url.search = new URLSearchParams(params);

export const AUTHORIZE_URL = url.toString();
