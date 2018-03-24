const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')

let tableData = []



ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
  tableData = data
  loadData()
})


function loadData() {
  document.getElementById('data').innerHTML = ""
  for (d in tableData) {
    document.getElementById('data').innerHTML +=
      "<tr>" +
      "<td>" + tableData[d].contractNumber + "</td>" +
      "<td>" + tableData[d].name + "</td>" +
      "<td>" + tableData[d].bankAccount + "</td>" +
      "<td>" + tableData[d].startTime + "</td>" +
      "<td>" + tableData[d].actualInterest + "</td>" +
      "</tr>"
  }
}



const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
  printPDFBtn.hidden = true
  ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
  printPDFBtn.hidden = false
})

