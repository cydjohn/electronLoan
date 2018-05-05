const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
// const newWindowBtn = document.getElementById('new')

let endDateAllData = []

let endDateTableData = []
// loadData()

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
  console.log('sum',loanSum);
}


// 搜索身份证号

const idSearchBox = document.getElementById("srch-term")

function checkId(idn) {
  if (idSearchBox.value == "") {
    return false
  }
  return idn.idNumber.search(idSearchBox.value) != -1
}

idSearchBox.addEventListener("input", () => {
  endDateTableData = endDateAllData.filter(checkId);
  loadData()
})

// 搜索合同号
const contraIdSearchBox = document.getElementById("contra-id")

function checkContractNumber(bn) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  return bn._id.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {
  endDateTableData = endDateAllData.filter(checkContractNumber);
  loadData()
})



// 打印预览
const printPreview = document.getElementById('end-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', endDateTableData)
  const modalPath = path.join('file://', __dirname, '../../sections/windows/end-date-table-print-preview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

// 借款日期筛选
const startDate = document.getElementById('end-date-table-datetimepicker1')
function checkStartDate(idn) {
  if (startDate.value == "") {
    return false
  }
  return idn.startTime.search(startDate.value) != -1
}

startDate.addEventListener("input", (event, arg) => {
  endDateTableData = endDateAllData.filter(checkStartDate);
  loadData()
})


// 还款日期筛选
const endDate = document.getElementById('end-date-table-datetimepicker3')
function checkEndDate(idn) {
  if (endDate.value == "") {
    return false
  }
  return idn.endTime.search(endDate.value) != -1
}

endDate.addEventListener("input", (event, arg) => {
  endDateTableData = endDateAllData.filter(checkEndDate);
  loadData()
})








