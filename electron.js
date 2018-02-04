const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

let width = 684;
let height = 596;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    transparent: true,
    resizable: false,
    title: 'Trash Bin Monster',
    minimizable: false,
    maximizable: false,
    fullscreenable: false
  });

  let loadURL = url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(loadURL);

  if (~process.argv.indexOf('--debug')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
})

app.on('activate', () => {
  //
});
