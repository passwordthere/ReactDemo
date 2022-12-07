/*
 * @Date: 2022-01-12 14:43:41
 * @LastEditTime: 2022-01-13 19:01:36
 * @Description: 全局消息提示
 * @FilePath: \yangzhengyi-frontend\src\utils\message\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MessageComponent from './MessageComponent'

class Msg {
  constructor () {
    let myRef = {current: ''}
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(<MessageComponent ref={myRef} />, div)
    this.refs = myRef
  }
  error (options) {
    this.refs.current.add(options,'error')
  }
  success (options) {
    this.refs.current.add(options, 'success')
  }
  warning (options) {
    this.refs.current.add(options, 'warning')
  }
}

Msg.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new Msg()
    }
    return instance
  }
})()

export const Message = Msg.getInstance()
