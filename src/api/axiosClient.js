import axios from "axios";
import { getLocalStorage, setLocalStorage } from "helper";
import { PEPPERS, USER } from "constant/localStorage";
import camelize from "camelize";
import queryString from "query-string";
import credentialApi from "./credentialApi";
import authorizeApi from "./authorizeApi";
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
    // console.log(error);
    return null;
  }
};
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  async (config) => {
    //using 2 token, one for not login, and one when login success
    let token =
      getLocalStorage(USER)?.accessToken ||
      getLocalStorage(PEPPERS)?.accessToken;
    if (!token) token = await getClientCredentialToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {}
);

axiosClient.interceptors.response.use(
  (response) => {
    isRefreshing = false;
    if (failedQueue.length > 0) {
      const token = getLocalStorage(USER)?.accessToken;
      processQueue(null, token);
    }
    // console.log("[AXIOS] - RESPONSE");
    return camelize(response?.data);
  },
  async (error) => {
    // console.log("[AXIOS] - ERROR, ", isRefreshing, error.config);

    const status = error.response.status;
    if (status === 401) {
      return handle401Error(error);
    }
    //  console.dir(error);
  }
);
async function handle401Error(error) {
  // console.log("[AXIOS] - 401ERROR, ", isRefreshing);
  const originalRequest = error.config;
  // If is refreshing, push all failed requests into failedRequest
  if (isRefreshing) {
    // console.log("[AXIOS] - ANOTHER REQUEST COMING...");
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(() => {
      // console.log("[AXIOS] call failed request again, ", isRefreshing);
      return axiosClient.request(originalRequest);
    });
  }
  // if (!isRefreshing) {
  // console.log("[AXIOS] REFRESHING...");

  isRefreshing = true;
  const lsUser = getLocalStorage(USER);
  if (lsUser) {
    const refreshToken = lsUser.refreshToken;
    try {
      let { data } = await authorizeApi.getTokenOnExpired(refreshToken);
      data = camelize(data);
      // console.log(data);
      setLocalStorage(USER, {
        accessToken: data.accessToken,
        refreshToken,
        expiresIn: data.expiresIn,
      });
      // isRefreshing = false;
      // console.log("[AXIOS]: queue, ", failedQueue);
      processQueue(null, null);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
    } catch (error) {
      throw Error("Refresh token failed! ", error?.message);
    }
  } else {
    await getClientCredentialToken();
  }
  return axiosClient.request(originalRequest);
  // }
}

export default axiosClient;
