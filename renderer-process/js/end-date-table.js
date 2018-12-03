const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')
// const newWindowBtn = document.getElementById('new')

let endDateAllData = []

let endDateTableData = []
// loadData()
const endDate = document.getElementById('end-date-table-datetimepicker3')
ipcRenderer.send('request-all-data')
ipcRenderer.on('get-all-data', (event, arg) => {
  endDateAllData = arg
})


function loadData() {
  document.getElementById('end-date-table-data').innerHTML = ""
  for (d in endDateTableData) {
    document.getElementById('end-date-table-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + endDateTableData[d].name + "</td>" +
      "<td>" + endDateTableData[d].bankAccount + "</td>" +
      "<td>" + endDateTableData[d].bankName + "</td>" +
      "<td>" + endDateTableData[d].openingBank + "</td>" +
      "<td>" + endDateTableData[d].startTime + "</td>" +
      "<td>" + endDateTableData[d].endTime + "</td>" +
      "<td>" + endDateTableData[d].amount + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var loanSum = 0;
  for (i in endDateTableData) {
    loanSum += parseFloat(endDateTableData[i].amount)
  }
  document.getElementById("end-date-table-loan-sum").innerHTML = loanSum
}








// 打印预览
const printPreview = document.getElementById('end-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  dialog.showSaveDialog({
    title: '还款时间表',
    defaultPath: '~/还款时间表.xlsx'
  }, function (result) {
    console.log(result)
    /* html表格转excel */
    var wb = XLSX.utils.table_to_book(document.getElementById('end-date-table'));
    /* 生成文件，导出D盘 */
    XLSX.writeFile(wb, result);
  });
})


// 还款日期筛选

function checkEndDate(idn) {
  if (endDate.value == "") {
    return false
  }
  return idn.endTime.search(endDate.value.slice(0, 7)) != -1
}

endDate.addEventListener("input", (event, arg) => {
  endDateTableData = endDateAllData.filter(checkEndDate);
  endDateTableData.sort(function (a, b) {
    return moment(a.endTime).isAfter(moment(b.endTime));
  });
  loadData()
})








