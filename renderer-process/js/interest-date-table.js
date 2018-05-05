const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
// const newWindowBtn = document.getElementById('new')

let allData = []

let tableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  allData = arg
})

ipcRenderer.on('add-new-loan', (event, arg) => {
  allData.push(arg)
  tableData = []
  tableData.push(arg)
  loadData()
  document.getElementById('button-table').click()
})

ipcRenderer.on('delete-contract-number', (event, arg) => {
  allData = allData.filter(function (item) {
    return item.contractNumber !== arg
  })
  tableData = tableData.filter(function (item) {
    return item.contractNumber !== arg
  })
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
  calculateSum()
}

function calculateSum() {
  var interestSum = 0;
  for (i in tableData) {
    interestSum += parseFloat(tableData[i].interest)
  }
  document.getElementById("interest-sum").innerHTML = interestSum

}


// 打印预览
const printPreview = document.getElementById('interest-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', tableData)
  const modalPath = path.join('file://', __dirname, '../../sections/windows/print-preview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
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
  tableData = allData.filter(checkInterestDate);
  loadData()
})






