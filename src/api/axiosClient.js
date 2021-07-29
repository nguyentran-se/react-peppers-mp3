import axios from "axios";
import { getLocalStorage } from "helper";
import { PEPPERS } from "constant/localStorage";
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
      const token = getLocalStorage(PEPPERS).accessToken;
      // console.log("[axios] token", token);
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
