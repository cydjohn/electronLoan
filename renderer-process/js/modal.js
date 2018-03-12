const {ipcRenderer} = require('electron');


const btn = document.getElementById("add-new")
const name = document.getElementById("name")
const idNumber = document.getElementById("id-number").textContent
const bankAccount = document.getElementById("bank-account")
const startTime = document.getElementById("start-time")
const endTime = document.getElementById("end-time")

btn.addEventListener('click', () => {
    
    ipcRenderer.send('getMsg', "fasdfasdfasdf")
})


ipcRenderer.on('add-new-loan', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`
    console.log(message)
})