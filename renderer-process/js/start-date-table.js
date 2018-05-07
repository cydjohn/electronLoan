const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
// const newWindowBtn = document.getElementById('new')

let startDataAllData = []

let startDateTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  startDataAllData = arg
})

ipcRenderer.on('add-new-loan', (event, arg) => {
  startDataAllData.push(arg)
  startDateTableData = []
  startDateTableData.push(arg)
  loadData()
  document.getElementById('button-table').click()
})

ipcRenderer.on('delete-contract-number', (event, arg) => {
  startDataAllData = startDataAllData.filter(function (item) {
    return item.contractNumber !== arg
  })
  startDateTableData = startDateTableData.filter(function (item) {
    return item.contractNumber !== arg
  })
  console.log("delete " + arg)
  loadData()
})

function loadData() {
  document.getElementById('start-date-data').innerHTML = ""
  for (d in startDateTableData) {
    document.getElementById('start-date-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + startDateTableData[d].contractNumber + "</td>" +
      "<td>" + startDateTableData[d].name + "</td>" +
      "<td>" + startDateTableData[d].bankAccount + "</td>" +
      "<td>" + startDateTableData[d].startTime + "</td>" +
      "<td>" + startDateTableData[d].amount + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var loanSum = 0
  for (i in startDateTableData) {
    loanSum += parseFloat(startDateTableData[i].amount)
  }
  document.getElementById("start-date-table-loan-sum").innerHTML = loanSum
}


// 打印预览
const printPreview = document.getElementById('start-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', startDateTableData)
  const modalPath = path.join('file://', __dirname, '../../sections/windows/start-date-table-print-preview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})




// 借款日期筛选
const startDate = document.getElementById('start-date-table-datetimepicker1')
function checkStartDate(idn) {
  if (startDate.value == "") {
    return false
  }
  return idn.startTime.search(startDate.value) != -1
}

startDate.addEventListener("input", (event, arg) => {
  startDateTableData = startDataAllData.filter(checkStartDate);
  loadData()
})







