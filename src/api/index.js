import Axios from './axios'


export function LoginAPI(data) {
    const res = Axios({
        url: '/login/',
        method: 'post',
        data: data,
    })
    return res
}

export function RegisterAPI(data) {
    const res = Axios({
        url: '/register/',
        method: 'post',
        data: data,
    })
    return res
}

export function CreatePatientAPI(data) {
    const res = Axios({
        url: '/patients/',
        method: 'post',
        data: data,
    })
    return res
}

export function RatingAPI(params) {
    let res = Axios({
        url: '/rating/',
        method: 'get',
        params: params,
    });
    return res;
}

export function ReportAPI(params) {
    let res = Axios({
        url: '/report/',
        method: 'get',
        params: params,
    });
    return res;
}
