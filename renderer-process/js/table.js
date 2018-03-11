const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
const newWindowBtn = document.getElementById('new')


ipcRenderer.on('add-new-loan', (event, arg) => {
  console.log('bbbbbbbbbb')
  const message = `Asynchronous message reply: ${arg}`
  console.log(message)
})

ipcRenderer.send('getMsg', "fasdfasdfasdf")

newWindowBtn.addEventListener('click', () => {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
  let win = new BrowserWindow({ width: 800, height: 600 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()

})



// const n = document.getElementById("new");
// const e = document.getElementById("data");
// n.addEventListener('click', (event) => {
//     e.innerHTML += "<tr><td>1</td><td>A001</td><td>Sachin</td><td>53023421532542345</td><td>62212424245345345345</td><td>2018-01-01</td><td>2019-01-01</td><td>10000.00</td><td>630</td><td>27.18</td><td>602.82</td><td>141.95</td><td>153.62</td><td>153.62</td><td>153.62</td></tr>";
// })
