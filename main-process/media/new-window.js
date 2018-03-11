const {ipcMain} = require('electron')

ipcMain.on('getMsg', (event, arg) => {
    console.log(arg)  
    event.sender.send('reply', arg)
    // document.getElementById('data').innerHTML += "<tr><td>1</td><td>A001</td><td>Sachin</td><td>53023421532542345</td><td>62212424245345345345</td><td>2018-01-01</td><td>2019-01-01</td><td>10000.00</td><td>630</td><td>27.18</td><td>602.82</td><td>141.95</td><td>153.62</td><td>153.62</td><td>153.62</td></tr>";
})