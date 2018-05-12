const path = require('path')
const { ipcMain, ipcRenderer, app } = require('electron')
const { BrowserWindow } = require('electron')


var Datastore = require('nedb')
var userData = app.getAppPath('userData');
<<<<<<< HEAD
// db = new Datastore({ filename: userData + '/.dist/persons.db', autoload: true });
db = new Datastore({ filename: 'D://db/persons.db', autoload: true});
=======
db = new Datastore({ filename: userData + '/dist/persons.db', autoload: true });
// db = new Datastore({ filename: 'D://db/persons.db', autoload: true});
// db = new Datastore({ filename: '~/Desktop/test.db', autoload: true});
>>>>>>> cebac4c1978415382864c4fd74ba916583731d3b


var tableData = []
var tempData = {}
var printDate = ""

ipcMain.on('getMsg', (event, arg) => {
    db.insert(arg, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        var arr = BrowserWindow.getAllWindows();
        for (var i = 0; i < arr.length; i++) {
            const toWindow = arr[i];
            toWindow.webContents.send('add-new-loan', newDoc);
            tempData = newDoc
        }
    });


})

ipcMain.on('pass-print-value', (event, arg) => {
    tableData = arg[0]
    printDate = arg[1]
})

ipcMain.on('request-all-data', (event, arg) => {
    // Find all documents in the collection
    db.find({}, function (err, docs) {
        event.sender.send('get-all-data', docs)
    });
})

ipcMain.on('get-print-value', (event, arg) => {
    event.sender.send('print-data', [tableData,printDate])
})

ipcMain.on('request-temp-data', (event, arg) => {
    event.sender.send('get-temp-data', tempData)
})

ipcMain.on('request-delete-contract', (event, cid) => {
    db.remove({ contractNumber: cid }, {}, function (err, numRemoved) {
        // numRemoved = 1
        event.sender.send('delete-info', numRemoved)
        if (numRemoved == 1) {
            var arr = BrowserWindow.getAllWindows();
            for (var i = 0; i < arr.length; i++) {
                const toWindow = arr[i];
                toWindow.webContents.send('delete-contract-number', cid);
            }
        }
    });
})

