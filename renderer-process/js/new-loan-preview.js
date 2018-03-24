const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')





const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
  printPDFBtn.hidden = true
  ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
  printPDFBtn.hidden = false
})


