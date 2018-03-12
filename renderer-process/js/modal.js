const {ipcRenderer} = require('electron');


const btn = document.getElementById("add-new")
btn.addEventListener('click', () => {
    ipcRenderer.send('getMsg', "fasdfasdfasdf")
})


ipcRenderer.on('add-new-loan', (event, arg) => {
    console.log('bbbbbbbbbb')
    const message = `Asynchronous message reply: ${arg}`
    console.log(message)
})