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
    document.getElementById('interest-date-table-data').innerHTML = ""
    for (d in tableData) {
        document.getElementById('interest-date-table-data').innerHTML +=
        "<tr>" +
        "<td>" + (parseInt(d) + 1) + "</td>" +
        "<td>" + tableData[d].name + "</td>" +
        "<td>" + tableData[d].bankAccount + "</td>" +
        "<td>" + tableData[d].bankName + "</td>" +
        "<td>" + tableData[d].openingBank + "</td>" +
        "<td>" + tableData[d].firstDay + "</td>" +
        "<td>" + tableData[d].interest + "</td>" +
        "</tr>"
    }

}



const printPDFBtn = document.getElementById('interest-date-table-print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

