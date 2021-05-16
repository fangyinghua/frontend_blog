import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager';
import qs from 'qs';
import parseHeaders from 'parse-headers';

let defaults = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {
            name: 'requestname',
            accept: 'application/json'
        }
    },
    transformRequest: (data) => {
        headers['common']['content-type'] = 'application/json';

        return JSON.stringify(data)

    },
    transformResponse: (response) => {
        return response.data;
    }
}

let getStyleMethods = ['get', 'head', 'delete', 'options']; // get风格的请求 没有请求体

getStyleMethods.forEach((method) => {
    defaults.headers[method] = {};
})

let postStyleMethods = ['post', 'put', 'patch']; // post风格的请求
postStyleMethods.forEach((method) => {
    defaults.headers[method] = {
        'content-type': 'application.json',
    };
})

let allMethods = [...getStyleMethods, ...postStyleMethods];

export default class Axios {

    defaults = defaults;
    interceptors = {
        request: new AxiosInterceptorManager(),
        response: new AxiosInterceptorManager()
    }

    request() {
        config.headers = Object.assign(this.defaults.headers, config.headers);
        if (config.transformRequest && config.data) {
            config.data = config.transformRequest(config.data, config.headers);
        }

        const chain = [{ onFulfilled: this.dispatchRequest }];
        this.interceptors.request.interceptors.forEach(interceptor => {
            interceptor && chain.unshift(interceptor)
        })


        this.interceptors.response.interceptors.forEach(interceptor => {
            interceptor && chain.push(interceptor)
        })


        let promise = Promise.resolve(config);

        while (chain.length) {
            const { onFulfilled, onRejected } = chain.shift();
            promise = promise.then(onFulfilled, onRejected);

        }
        return promise;
    }

    dispatchRequest(config) {
        return new Promise((resolve, reject) => {
            let { method, url, params, headers, data, timeout } = config;

            let request = new XMLHttpRequestRequest();
            if (params) {
                params = qs.stringify(params);
                url += (url.indextOf('?') > 0 ? '&' : '?') + params;
            }
            request.open(method, url, true);
            request.responseType = 'json';

            request.onreadystatechange = function () { // 指定一个状态变更函数
                // readyState 有1 2 3 4 四个状态 4 表示完成
                if (request.readyState === 4 && request.status !== 0) { // 超时的时候请求的状态码是0
                    if (request.status >= 200 && request.status < 300) {
                        // 如果成功，返回axios响应体
                        let response = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.responseType,
                            // request.getAllResponseHeaders() 获取到的是content-type=xx; content-length=42=>content-type:xx, content-length:42 利用parse-headers来转为json
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if (config.transformResponse) {
                            response = config.transformResponse(response);
                        }
                        resolve(response);
                    } else { // 状态码错误
                        reject(`Error: Request failed with status code ${request.status}`)
                    }
                }
            }

            if (headers) {
                for (const key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        if (key === 'common' || allMethods.includes(key)) {
                            if (key === 'common' || key === config.method) {
                                for (const key2 in headers[key]) {
                                    if (headers[key].hasOwnProperty(key2)) {
                                        request.setRequestHeader(key2, headers[key][key2])
                                    }
                                }
                            }
                        } else {
                            request.setRequestHeader(key, headers[key])
                        }
                    }
                }
            }
            let body = null;
            if (data) {
                body = JSON.stringify(data);
            }
            // 如果请求没发出去
            request.onerror = function () {
                reject('net::ERR_INTERNET_DISCONNECTED')
            }
            // 如果传入了timeout且超时
            if (timeout) {
                request.timeout = timeout; // 设置超时时间
                request.ontimeout = function () {
                    reject(`Error: timeout of ${timeout}ms exceeded`)
                }
            }
            if (config.cancelToken) {
                config.cancelToken.then((message) => {
                    request.abort();
                    reject(message)
                })
            }
            request.send(body);
        })
    }

}