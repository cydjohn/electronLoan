const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')

var tableData = []
var printDate = ""
ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    tableData = data[0]
    printDate = data[1]
    tableData.sort(function(a, b) {
        return a[1] - b[1];
    });
    loadData()
})



function loadData() {
    document.getElementById('data').innerHTML = ""
    for (d in tableData) {
        document.getElementById('data').innerHTML +=
            "<tr>" +
            "<td>" + (parseInt(d) + 1) + "</td>" +
            "<td>" + tableData[d].name + "</td>" +
            "<td>" + tableData[d].bankAccount + "</td>" +
            "<td>" + tableData[d].bankName + "</td>" +
            "<td>" + tableData[d].openingBank + "</td>" +
            "<td>" + tableData[d].startTime + "</td>" +
            "<td>" + tableData[d].endTime + "</td>" +
            "<td>" + tableData[d].amount + "</td>" +
            "</tr>"
    }
    calculateSum()
}


function calculateSum() {
    var loanSum = 0;
    for (i in tableData) {
      loanSum += parseFloat(tableData[i].amount)
    }
    document.getElementById("end-date-table-loan-sum").innerHTML = loanSum
  }



const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

