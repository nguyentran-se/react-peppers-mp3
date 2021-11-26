import axios from "axios";
/**
 * @description authorization_code flow
 */

const authorizeInstance = axios.create({
  baseURL: "https://accounts.spotify.com/api/token",
});

const authorizeApi = {
  getAuthorize: (code) => {
    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append(
      "redirect_uri",
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000/"
        : "https://peppersmp3.netlify.app/"
    );
    data.append("client_id", process.env.REACT_APP_CLIENT_ID);
    data.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
    return authorizeInstance.post("", data);
  },

  getTokenOnExpired: (refreshToken) => {
    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refreshToken);
    data.append("client_id", process.env.REACT_APP_CLIENT_ID);
    data.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
    return authorizeInstance.post("", data);
  },
};

export default authorizeApi;
