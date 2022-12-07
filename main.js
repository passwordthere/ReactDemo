const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron')
const path = require('path')
// const isDev = require('electron-is-dev')
const url = require('url')
const fs = require('fs')
let mainWindow, tray
const iconPath = path.join(__dirname, './src/assets/icon.jpeg')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const express = require('express')
const server = express()
const port = 3030


function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1500,
    minHeight: 1000,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      preload: path.join(__dirname, '/preload.js'),
      backgroundThrottling: false,
      contextIsolation: false
    }
  })

  // mainWindow.loadURL(
  //   isDev
  //     ? 'http://localhost:3000'
  //     : `file://${path.join(__dirname, './build/index.html')}`
  // )

  // 加载应用----react 打包
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './build/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // 加载应用----适用于 react 项目
  mainWindow.loadURL('http://localhost:3000/')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
function createTray() {
  tray = new Tray(iconPath)
  tray.setToolTip('佰翊眼征仪系统')
  //点击图标的响应事件，这里是切换主窗口的显示和隐藏
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })
}
function createMainMenu() {
  // const menu = [
  //   {
  //     label: '菜单',
  //     // submenu 代表下一级菜单
  //     submenu: [
  //       {
  //         label: '登录',
  //         // 添加快捷键
  //         // accelerator: 'ctrl+n'
  //       },
  //       { label: '退出' },
  //       { label: '注销' },
  //     ],
  //   },
  //   {
  //     label: '其他',
  //     // submenu 代表下一级菜单
  //     submenu: [
  //       {
  //         label: '帮助',
  //         // 添加快捷键
  //         // accelerator: 'ctrl+n'
  //       },
  //       { label: '联系我们' }
  //     ],
  //   }
  // ]

  // // 3.从模板中创建菜单
  // const mainMenu = Menu.buildFromTemplate(menu)

  // // 4.设置为应用程序菜单
  // Menu.setApplicationMenu(mainMenu)
  Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
  createWindow()
  createTray()
  // createMainMenu()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// ipcMain.on('up', () => {
//   let a = mainWindow.getPosition()
//   console.log(a)
//   let x = mainWindow.getPosition()[0] + 10
//   let y = mainWindow.getPosition()[1]
//   mainWindow.setPosition(x, y)
// })
// ipcMain.on('down', () => {
//   let b = mainWindow.getPosition()
//   console.log(b)
//   let x = mainWindow.getPosition()[0] - 10
//   let y = mainWindow.getPosition()[1]
//   mainWindow.setPosition(x, y)
// })
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



server.listen(port, () => {
   console.log('Example app listening at http://localhost:3030')
})
server.get('/read_patient_info', function (req, res) {
  console.log('res', res.req.query)
  let arg = res.req.query
  let patientData = {
    name: arg.name,
    patientNo: arg.patient_no,
    IDNumber: arg.ID_num,
    detectionTime: arg.detection_time,
    locateTime:arg.locate_time,
    age: arg.age,
    gender: arg.gender === '2' ? '女' : '男',
    department: arg.department,
    doctor: arg.doctor,
    medicalRecord: arg.medical_record,
    jaw: arg.jaw,
    forehead:arg.forehead,
    eye_left: arg.eye_left,
    eye_right: arg.eye_right,
    left_pressure:arg.left_pressure,
    right_pressure: arg.right_pressure
  }
  mainWindow.webContents.send('read_patient_info', patientData)
})

server.get('/finish', function (req, res) {
   console.log('finish', res.req.query)
  mainWindow.webContents.send('finish', res.req.query)
})
server.get('/error', function (req, res) {
  console.log('error', res.req.query)
  mainWindow.webContents.send('error', res.req.query)
})
