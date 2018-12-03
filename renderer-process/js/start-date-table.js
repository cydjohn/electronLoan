const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')
// const newWindowBtn = document.getElementById('new')

let startDataAllData = []

let startDateTableData = []
// loadData()
const startDate = document.getElementById('start-date-table-datetimepicker1')
ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  startDataAllData = arg
})

// ipcRenderer.on('add-new-loan', (event, arg) => {
//   startDataAllData.push(arg)
//   startDateTableData = []
//   startDateTableData.push(arg)
//   loadData()
//   document.getElementById('button-table').click()
// })

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
      "<td>" + parseFloat(startDateTableData[d].amount).toFixed(2) + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var loanSum = 0
  for (i in startDateTableData) {
    loanSum += parseFloat(startDateTableData[i].amount)
  }
  document.getElementById("start-date-table-loan-sum").innerHTML = loanSum.toFixed(2)
}


// 打印预览
const printPreview = document.getElementById('start-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  dialog.showSaveDialog({
    title: '借款时间表',
    defaultPath: '~/借款时间表.xlsx'
  }, function (result) {
    console.log(result)
    /* html表格转excel */
    var wb = XLSX.utils.table_to_book(document.getElementById('start-date-dataTable'));
    /* 生成文件，导出D盘 */
    XLSX.writeFile(wb, result);
  });
})




// 借款日期筛选

function checkStartDate(idn) {
  if (startDate.value == "") {
    return false
  }
  return idn.startTime.search(startDate.value.slice(0, 7)) != -1
}

startDate.addEventListener("input", (event, arg) => {
  startDateTableData = startDataAllData.filter(checkStartDate);
  startDateTableData.sort(function (a, b) {
    return moment(a.startTime).isAfter(moment(b.startTime));
  });
  loadData()
})







