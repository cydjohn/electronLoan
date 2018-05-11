const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')
// const newWindowBtn = document.getElementById('new')

let interestDateAllData = []

let interestDateTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  interestDateAllData = arg
})


ipcRenderer.on('delete-contract-number', (event, arg) => {
  interestDateAllData = interestDateAllData.filter(function (item) {
    return item.contractNumber !== arg
  })
  interestDateTableData = interestDateTableData.filter(function (item) {
    return item.contractNumber !== arg
  })
  loadData()
})

function getInterestPaymentAmount(rowData) {
  if(moment(rowData.firstDay).isBefore(moment(new Date()))) {
    if(moment(rowData.secondDay).isBefore(moment(new Date()))){
      if(moment(rowData.thirdDay).isBefore(moment(new Date()))){
        if(moment(rowData.fourthDay).isBefore(moment(new Date()))){
          // 过期的

        }
        else {

          return (rowData.actualInterest - rowData.firstPay - rowData.restPayment *2).toFixed(2)
        }
      }
      else {

        return rowData.restPayment
      }
    }
    else {

      return rowData.restPayment
    }
  }
  else {

    return rowData.firstPayment
  }
}


function loadData() {
  document.getElementById('interest-date-table-data').innerHTML = ""
  for (d in interestDateTableData) {
    document.getElementById('interest-date-table-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + interestDateTableData[d].name + "</td>" +
      "<td>" + interestDateTableData[d].bankAccount + "</td>" +
      "<td>" + interestDateTableData[d].bankName + "</td>" +
      "<td>" + interestDateTableData[d].openingBank + "</td>" +

      "<td>" + interestDateTableData[d].firstDay + "</td>" +

      "<td>" + getInterestPaymentAmount(interestDateTableData[d]) + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var acturalInterestSum = 0;
  for (i in interestDateTableData) {
    acturalInterestSum += parseFloat(interestDateTableData[i].actualInterest)
  }
  document.getElementById("interest-date-table-actural-interest-sum").innerHTML = acturalInterestSum.toFixed(2)
}

// 打印预览
const printPreview = document.getElementById('interest-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', interestDateTableData)
  const modalPath = path.join('file://', __dirname, '../../sections/windows/interest-date-table-print-preview.html')
  let win = new BrowserWindow({ width: 1000, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

// 付息日筛选
const interestDate = document.getElementById('interest-date-table-datetimepicker2')
function checkInterestDate(idn) {
  if (interestDate.value == "") {
    return false
  }
  return idn.firstDay.search(interestDate.value.slice(0,7)) != -1
}

interestDate.addEventListener("input", (event, arg) => {
  interestDateTableData = interestDateAllData.filter(checkInterestDate);
  loadData()
})






