import axios from "axios";
import querystring from "querystring";
import {transactionsIp} from "../../config/EndPoint";

export function transactionsServicePost(payload, apiRoute) {
    return new Promise(function (resolve, reject) {
        axios
            .post(
                transactionsIp + apiRoute,
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

export function transactionsServiceGetAll(apiRoute) {
    return new Promise(function (resolve, reject) {
        axios
            .post(transactionsIp + apiRoute)
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
    });
}


export function transactionsServiceGetWithPromise(apiRoute) {
    return new Promise(function (resolve, reject) {
        axios
            .get(transactionsIp + apiRoute)
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
    });
}


export const promiselessTransactionsServiceGetAll = apiRoute => axios.post(transactionsIp + apiRoute);

export const simpleTransactionsServiceGet = apiRoute => axios.get(transactionsIp + apiRoute);

export const promiselessTransactionsServicePost = (payload, apiRoute) =>
    axios.post(
        transactionsIp + apiRoute,
        querystring.stringify({
            ...payload
        })
    );

const jsonAxiosInstance = axios.create({
    headers: {
        ContentType: 'application/json'
    },
});

export const promiselessJsonTransactionsServiceGetAll = apiRoute => jsonAxiosInstance.post(transactionsIp + apiRoute);

export const promiselessJsonTransactionsServicePost = (payload, apiRoute) =>
    jsonAxiosInstance.post(
        transactionsIp + apiRoute,
        payload
    );

export const transactionsServiceGet = apiRoute => jsonAxiosInstance.get(transactionsIp + apiRoute);

export const downloadExcelFileFromBackend = (url, fileName) => {
    axios.get(url, {
        method: 'GET',
        responseType: 'blob' // important
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
    });
};
