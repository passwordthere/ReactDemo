/*
 * @Date: 2022-01-11 18:39:00
 * @LastEditTime: 2022-01-12 15:10:05
 * @Description: 对Axios的二次封装
 * @FilePath: \yangzhengyi-frontend\src\api\axios.js
 * https://juejin.cn/post/6968630178163458084
 */
import axios from 'axios';
import {Message} from '../utils/message';


function Axios(axiosConfig, customOptions) {
    const service = axios.create({
        baseURL: 'http://localhost:8000/api', // 设置统一的请求前缀
        timeout: 60000, // 设置统一的超时时长
    });

    let custom_options = Object.assign({
        repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
        loading: false, // 是否开启loading层效果, 默认为false
        reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
        error_message_show: true, // 是否开启接口错误信息展示,默认为true
        code_message_show: true, // 是否开启code不为0时的信息提示, 默认为false
    }, customOptions);

    service.interceptors.request.use(
        config => {
            removePending(config);
            custom_options.repeat_request_cancel && addPending(config);
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    service.interceptors.response.use(
        response => {
            removePending(response.config);
            if (custom_options.code_message_show && response.data && response.data.code === -1) {
                Message.error({message: response.data.message})
                return Promise.reject(response.data);
            }
            // if (custom_options.code_message_show && response.data && response.data.code === 0) {
            //     Message.success({message: response.data.message})
            // }
            return custom_options.reduct_data_format ? response.data : response;
        },
        error => {
            error.config && removePending(error.config);
            custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
            return Promise.reject(error);
        }
    );

    return service(axiosConfig)
}

export default Axios;


function httpErrorStatusHandle(error) {
    if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message); // 处理被取消的请求
    let message = '';
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = '接口重定向了！';
                break;
            case 400:
                message = '参数不正确！';
                break;
            case 401:
                message = '请重新登录！';
                break;
            case 403:
                message = '您没有权限操作！';
                break;
            case 404:
                message = `请求地址出错: ${error.response.config.url}`;
                break; // 在正确域名下
            case 408:
                message = '请求超时！';
                break;
            case 409:
                message = '系统已存在相同数据！';
                break;
            case 500:
                message = '服务器内部错误！';
                break;
            case 501:
                message = '服务未实现！';
                break;
            case 502:
                message = '网关错误！';
                break;
            case 503:
                message = '服务不可用！';
                break;
            case 504:
                message = '服务暂时无法访问，请稍后再试！';
                break;
            case 505:
                message = 'HTTP版本不受支持！';
                break;
            default:
                message = '异常问题，请联系管理员！';
                break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
    if (error.message.includes('Connnection')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

    Message.error({message: message})

    // if ('response' in error && error.response.status !== 401) {
    //     let message = '未捕获的错误 ' + error.response.status
    //     Message.error({message: message})
    // }
}


const pendingMap = new Map();

function getPendingKey(config) {
    let {url, method, params, data} = config;
    if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    });
}

function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey);
    }
}