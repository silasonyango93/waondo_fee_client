import axios from "axios";
import querystring from "querystring";
import ip from "../../config/EndPoint";

export function apiPost(payload, apiRoute) {
  return new Promise(function(resolve, reject) {
    axios
      .post(
        ip + apiRoute,
        querystring.stringify({
          ...payload
        })
      )
      .then(response => {
        resolve(response);
      })
      .catch(response => {
        reject(response);
      });
  });
}

export function apiGetAll(apiRoute) {
  return new Promise(function(resolve, reject) {
    axios
      .post(ip + apiRoute)
      .then(response => {
        resolve(response);
      })
      .catch(response => {
        reject(response);
      });
  });
}
