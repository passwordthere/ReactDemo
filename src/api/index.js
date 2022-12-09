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

// STATUS
export function ChangeStatusAPI(params) {
    let res = Axios({
        url: '/change_step/',
        method: 'get',
        params: params,
    })
    return res
}

export function LocateAPI(params) {
    let res = Axios({
        url: '/start_locate/',
        method: 'get',
        params: params,
    })
    return res
}

export function SurfaceAPI(params) {
    let res = Axios({
        url: '/surface/',
        method: 'get',
        params: params,
    })
    return res
}

export function ProptosisAPI(params) {
    let res = Axios({
        url: '/proptosis/',
        method: 'get',
        params: params,
    })
    return res
}

export function WidthAPI(params) {
    let res = Axios({
        url: '/width_redness/',
        method: 'get',
        params: params,
    })
    return res
}

export function RotationAPI(params) {
    let res = Axios({
        url: '/rotation/',
        method: 'get',
        params: params,
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
