/*
 * @Date: 2022-01-13 17:35:52
 * @LastEditTime: 2022-01-14 17:23:38
 * @Description: 常用方法
 * @FilePath: \yangzhengyi-frontend\src\utils\index.js
 */

/**
 * @description 数字前加0
 * @date 14/01/2022
 * @param {*} m
 * @returns {*}  
 */
function formatTime(m) { return m < 10 ? '0' + m : m }
/**
 * @description 时间戳变为普通时间格式
 * @date 14/01/2022
 * @param {*} unix
 * @returns {*}  
 */
export function unixToCommon(unix) {
    let time = new Date(unix * 1000);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y + '-' + formatTime(m) + '-' + formatTime(d) + ' ' + formatTime(h) + ':' + formatTime(mm) + ':' + formatTime(s);
}
