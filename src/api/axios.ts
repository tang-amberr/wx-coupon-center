import axios from "axios";

const MyAxios = axios.create({
    baseURL: 'http://127.0.0.1:2001/admin/business/api/v1',
    timeout: 1000,
});

// 添加请求拦截器
MyAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
});

// 添加响应拦截器
MyAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 200) {
        return Promise.reject(
            {
                message: res.msg,
                status: res.code
            }
        );
    } else {
        return res.data;
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('err:', error);
    return Promise.reject(error);
});

export default MyAxios;