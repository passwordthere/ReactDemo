import Axios from './axios'


export function RegisterAPI(data) {
    const res = Axios({
        url: '/register/',
        method: 'post',
        data: data,
    })
    return res
}

export function LoginAPI(data) {
    const res = Axios({
        url: '/login/',
        method: 'post',
        data: data,
    })
    return res
}

export function DoctorListAPI(params) {
    return Axios({
        url: '/doctors/',
        method: 'get',
        params: params,
    })
}

export function PatientListAPI(params) {
    const res = Axios({
        url: '/patients/',
        method: 'get',
        params: params,
    })
    return res
}

export function PatientCreateAPI(data) {
    const res = Axios({
        url: '/patients/',
        method: 'post',
        data: data,
    })
    return res
}

export function DetectListAPI(params) {
    const res = Axios({
        url: '/detects/',
        method: 'get',
        params: params,
    })
    return res
}

/*
*
*
*
* */


export function ChangeStatusAPI(params) {
    let res = Axios({
        url: '/change_step/',
        method: 'get',
        params: params,
    })
    return res
}

export function LocateAPI(params) {
    return Axios({
        url: '/start_locate/',
        method: 'get',
        params: params,
    })
}

export function LocateAdjustAPI(params) {
    return Axios({
        url: '/adjust_locate/',
        method: 'get',
        params: params,
    })
}

export function LocateConfirmAPI(params) {
    return Axios({
        url: '/confirm_locate/',
        method: 'get',
        params: params,
    })
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

export function WidthReAPI(params) {
    let res = Axios({
        url: '/width_redness/',
        method: 'put',
        params: params,
    })
    return res
}

export function WidthReManualAPI(data) {
    let res = Axios({
        url: '/width_redness/',
        method: 'post',
        data: data,
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

export function ReportSaveAPI(params) {
    let res = Axios({
        url: '/save/',
        method: 'get',
        params: params,
    });
    return res;
}


export function ResetAPI(params) {
    return Axios({
        url: '/reset/',
        method: 'get',
        params: params,
    });
}
