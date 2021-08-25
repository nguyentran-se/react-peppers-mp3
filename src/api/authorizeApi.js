import axios from "axios";
/**
 * @description authorization_code flow
 */
const authorizeURL = "https://accounts.spotify.com/api/token";

const authorizeApi = {
   getAuthorize: (code) => {
      let myHeaders = new Headers();
      myHeaders.append(
         "Authorization",
         `Basic ${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
      );
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("code", code);
      urlencoded.append("redirect_uri", "http://localhost:3000/");
      urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
      urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
      return axios({
         method: "post",
         url: authorizeURL,
         headers: myHeaders,
         data: urlencoded,
      });
   },
};

export default authorizeApi;
