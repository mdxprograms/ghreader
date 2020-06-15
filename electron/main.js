const fs = require('fs')
const { app, shell, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')
const { channels } = require('../src/shared/constants')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '../public/index.html'),
      protocol: 'file:',
      slashes: true
    })
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(startUrl)
  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    shell.openExternal(url)
  })
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on(channels.APP_INFO, event => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion()
  })
})

ipcMain.on(channels.USER_TOKEN_CHECK, event => {
  const envFile = fs.existsSync('./.env.local')
  let hasToken = false

  if (envFile) {
    const fileInfo = fs.readFileSync('./.env.local').toString('utf-8')
    hasToken =
      fileInfo.includes('REACT_APP_GH_TOKEN') &&
      fileInfo.split('=')[1].length > 0
  }

  event.sender.send(channels.USER_TOKEN_CHECK, {
    hasToken
  })
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available')
})

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})
