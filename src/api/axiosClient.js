import axios from "axios";
import { getLocalStorage } from "helper";
import { PEPPERS, USER } from "constant/localStorage";
import camelize from "camelize";
import queryString from "query-string";
const axiosClient = axios.create({
   headers: {
      "Content-Type": "application/json",
   },
   baseURL: "https://api.spotify.com/v1",
   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
   (config) => {
      //using 2 token, one for not login, and one when login success
      const token =
         getLocalStorage(USER)?.accessToken ||
         getLocalStorage(PEPPERS).accessToken;
      // console.log(token);
      if (token) config.headers.Authorization = `Bearer ${token}`;
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
