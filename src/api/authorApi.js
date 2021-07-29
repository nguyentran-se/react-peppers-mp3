import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "constant";
const authorURL = "https://accounts.spotify.com/api/token";
const authorApi = {
   getAuthorization: () => {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${CLIENT_ID}:${CLIENT_SECRET}`);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");
      urlencoded.append("client_id", CLIENT_ID);
      urlencoded.append("client_secret", CLIENT_SECRET);
      return axios({
         method: "post",
         url: authorURL,
         headers: myHeaders,
         data: urlencoded,
      });
   },
};

export default authorApi;
