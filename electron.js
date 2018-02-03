const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 684,
    height: 596,
    maxWidth: 684,
    maxHeight: 596,
    frame: false,
    transparent: true,
    resizable: false,
    title: 'Bin Monster',
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

  mainWindow.webContents.openDevTools();

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