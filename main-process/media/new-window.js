const path = require('path')
const { ipcMain, ipcRenderer,app} = require('electron')
const { BrowserWindow } = require('electron')


var Datastore = require('nedb')
var userData = app.getAppPath('userData');
db = new Datastore({ filename: userData+'/db/persons.db', autoload: true });


let tableData = []

ipcMain.on('getMsg', (event, arg) => {
    var arr = BrowserWindow.getAllWindows();
    for (var i = 0; i < arr.length; i++) {
        const toWindow = arr[i];
        toWindow.webContents.send('add-new-loan', arg);
    }
    db.insert(arg, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });

})

ipcMain.on('pass-print-value', (event, arg) => {
    tableData = arg
})

ipcMain.on('request-all-data', (event, arg) => {
    // Find all documents in the collection
    db.find({}, function (err, docs) {
        event.sender.send('get-all-data', docs)
    });
})

ipcMain.on('get-print-value', (event, arg) => {
    event.sender.send('print-data', tableData)
})