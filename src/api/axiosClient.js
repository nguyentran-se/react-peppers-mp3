import axios from "axios";
import { getLocalStorage, setLocalStorage } from "helper";
import { PEPPERS, USER } from "constant/localStorage";
import camelize from "camelize";
import queryString from "query-string";
import credentialApi from "./credentialApi";
const axiosClient = axios.create({
   headers: {
      "Content-Type": "application/json",
   },
   baseURL: "https://api.spotify.com/v1",
   paramsSerializer: (params) => queryString.stringify(params),
});

const getClientCredentialToken = async () => {
   try {
      let { data } = await credentialApi.getClientCredential();
      // console.log(response?.data.access_token);
      data = camelize(data);
      setLocalStorage(PEPPERS, data);
      return data.accessToken;
   } catch (error) {
      console.log(error);
      return null;
   }
};

axiosClient.interceptors.request.use(
   async (config) => {
      //using 2 token, one for not login, and one when login success
      let token =
         getLocalStorage(USER)?.accessToken ||
         getLocalStorage(PEPPERS)?.accessToken;
      if (!token) token = await getClientCredentialToken();
      // if (token)
      config.headers.Authorization = `Bearer ${token}`;
      return config;
   },
   (error) => {}
);

axiosClient.interceptors.response.use(
   (response) => {
      // return response;
      return camelize(response?.data);
   },
   (error) => {}
);

export default axiosClient;
