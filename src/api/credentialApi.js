import axios from "axios";
/**
 * @description client_credentials flow
 */
const credentialURL = "https://accounts.spotify.com/api/token";

const credentialApi = {
   getClientCredential: () => {
      let myHeaders = new Headers();
      myHeaders.append(
         "Authorization",
         `Basic ${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
      );
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("grant_type", "client_credentials");
      urlencoded.append("client_id", process.env.REACT_APP_CLIENT_ID);
      urlencoded.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
      return axios({
         method: "post",
         url: credentialURL,
         headers: myHeaders,
         data: urlencoded,
      });
   },
};

export default credentialApi;
