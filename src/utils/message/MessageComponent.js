/*
 * @Date: 2022-01-12 14:42:54
 * @LastEditTime: 2022-01-12 17:56:49
 * @Description: 全局消息提示组件
 * @FilePath: \yangzhengyi-frontend\src\utils\message\MessageComponent.js
 */
import React, { Component } from 'react';
import './Message.css'

class MessageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      messages: [],
      max: 5
    }
  }
  add = (options, type) => {
    let { id, messages } = this.state
    let layer = {
      id: id++,
      type: type,
      ...options
    }
    layer.timer = setTimeout(() => {
      this.remove(layer)
    }, 2000);
    messages.push(layer)
    this.setState({ id, messages })
  }
  remove = (layer) => {
    clearTimeout(layer.timer)
    let messages = this.state.messages.filter(item => item.id !== layer.id)
    this.setState({ messages })
  }
  render() {
    return (
      <ul>
        {this.state.messages.map(
          (item, index) => <li key={index} className={"message "+ item.type }>{item.message}</li>
        )}
      </ul>
    );
  }
}

export default MessageComponent;
