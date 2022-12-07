console.log('aa')
const fs = require('fs')
const electron = require('electron')
const { ipcRenderer } = electron
// setTimeout(() => {
// const titleDom = document.getElementById('show_file_content')

// console.log(window,document,titleDom,this)
// titleDom.addEventListener('click', () => {
//     ipcRenderer.send('mainWindow:close')
// })
ipcRenderer.on('send-message-to-render-test', (event, arg) => {
    console.log('渲染进程收到的消息:',arg)
})
// }, 3000);

// const fs = require('fs')
// const path = require('path')
// const { log } = console

// // 获取到文件展示的dom
// const showContent = document.getElementById('show_file_content')

// // 读取文件
// function readFile() {
//   console.log('读取文件')
//   fs.readFile(path.join(__dirname, '/test.txt'), (err, data) => {
//     if (err) {
//       throw new Error(err, '读取文件失败')
//     }
//     showContent.innerText = data
//   })
// }
// // 需要写入的内容
// const content = '今天是国庆的第二天，在学 electron'

// // 写入文件
// function writeFile() {
//   fs.writeFile(
//     path.join(__dirname, '/test.txt'),
//     content,
//     'utf8',
//     (err, data) => {
//       if (err) {
//         return new Error(err, '读取文件失败')
//       }
//       log('写入文件成功')
//     }
//   )
// }