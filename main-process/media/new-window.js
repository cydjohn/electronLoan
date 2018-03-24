const {ipcMain,ipcRenderer} = require('electron')
const {BrowserWindow} = require('electron')


let tableData = []

ipcMain.on('getMsg', (event, arg) => {
    var arr = BrowserWindow.getAllWindows();
    for(var i = 0; i < arr.length; i++){
        const toWindow = arr[i];
        toWindow.webContents.send('add-new-loan', arg);
    }
    // document.getElementById('data').innerHTML += "<tr> <td>1</td> <td>A0001</td> <td>Sachin</td> <td>53023421532542345</td> <td>62212424245345345345</td> <td>2018-01-01</td> <td>2018-03-15</td> <td>2019-01-01</td> <td>10000.00</td> <td>6.3</td> <td>630</td> <td>27.18</td> <td>602.82</td> <td>141.95</td> <td>153.62</td> <td>153.62</td> <td>153.62</td> </tr>";
    // ipcRenderer.sendTo(0, 'add-new-loan',arg);
})

ipcMain.on('pass-print-value', (event, arg) => {
    tableData = arg
})

ipcMain.on('get-print-value', (event, arg) => {
    event.sender.send('print-data', tableData)
})