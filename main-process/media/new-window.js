const {ipcMain,ipcRenderer} = require('electron')
const {BrowserWindow} = require('electron')

ipcMain.on('getMsg', (event, arg) => {
    // var arr = BrowserWindow.getAllWindows();
    // for(var i = 0; i < arr.length; i++){
    //     console.log(i);
    //     const toWindow = arr[i];
    //     toWindow.webContents.send('add-new-loan', arg);
    // }
    ipcRenderer.sendTo(0, 'add-new-loan',arg);
})