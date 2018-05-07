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
  console.log("delete " + arg)
  loadData()
})

function loadData() {
  document.getElementById('data').innerHTML = ""
  console.log(allData.length)
  for (d in tableData) {
    document.getElementById('data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + tableData[d].contractNumber + "</td>" +
      "<td>" + tableData[d].name + "</td>" +
      "<td>" + tableData[d].idNumber + "</td>" +
      "<td>" + tableData[d].bankAccount + "</td>" +
      "<td>" + tableData[d].bankName + "</td>" +
      "<td>" + tableData[d].openingBank + "</td>" +
      "<td>" + tableData[d].startTime + "</td>" +
      "<td>" + tableData[d].firstDay + "</td>" +
      "<td>" + tableData[d].endTime + "</td>" +
      "<td>" + tableData[d].amount + "</td>" +
      "<td>" + tableData[d].interestRate + "</td>" +
      "<td>" + tableData[d].interest + "</td>" +
      "<td>" + tableData[d].tax + "</td>" +
      "<td>" + tableData[d].actualInterest + "</td>" +
      "<td>" + tableData[d].firstPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var loanSum = 0, interestSum = 0, taxSum = 0, acturalInterestSum = 0, firstInterestSum = 0,
    secondInterestSum = 0, thirdInterestSum = 0, fourthInterestSum = 0
  for (i in tableData) {
    loanSum += parseFloat(tableData[i].amount)
    interestSum += parseFloat(tableData[i].interest)
    taxSum += parseFloat(tableData[i].tax)
    acturalInterestSum += parseFloat(tableData[i].actualInterest)
    firstInterestSum += parseFloat(tableData[i].firstPayment)
    secondInterestSum += parseFloat(tableData[i].restPayment)
    thirdInterestSum += parseFloat(tableData[i].restPayment)
    fourthInterestSum += parseFloat(tableData[i].restPayment)
  }

  document.getElementById("loan-sum").innerHTML = loanSum
  document.getElementById("interest-sum").innerHTML = interestSum
  document.getElementById("tax-sum").innerHTML = taxSum
  document.getElementById("actural-interest-sum").innerHTML = acturalInterestSum.toFixed(2)
  document.getElementById("first-interest-sum").innerHTML = firstInterestSum.toFixed(2)
  document.getElementById("second-interest-sum").innerHTML = secondInterestSum.toFixed(2)
  document.getElementById("third-interest-sum").innerHTML = thirdInterestSum.toFixed(2)
  document.getElementById("fourth-interest-sum").innerHTML = fourthInterestSum.toFixed(2)
}


// 搜索身份证号

const idSearchBox = document.getElementById("srch-term")

function checkId(idn) {
  if (idSearchBox.value == "") {
    return false
  }
  else if(idSearchBox.value == "*") {
    return true
  }
  return idn.idNumber.search(idSearchBox.value) != -1
}

idSearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkId);
  loadData()
})

// 搜索合同号
const contraIdSearchBox = document.getElementById("contra-id")

function checkContractNumber(bn) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  else if(contraIdSearchBox.value == "*") {
    return true
  }
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkContractNumber);
  loadData()
})



// 打印预览
const printPreview = document.getElementById('print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', tableData)
  const modalPath = path.join('file://', __dirname, '../../sections/windows/print-preview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

// 删除

const deleteRecorde = document.getElementById('delete')
deleteRecorde.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/delete.html')
  let win = new BrowserWindow({ width: 600, height: 400 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})


// 借款日期筛选
const startDate = document.getElementById('datetimepicker1')
function checkStartDate(idn) {
  if (startDate.value == "") {
    return false
  }
  return idn.startTime.search(startDate.value.slice(0,7)) != -1
}

startDate.addEventListener("input", (event, arg) => {
  tableData = allData.filter(checkStartDate);
  loadData()
})


// 还款日期筛选
const endDate = document.getElementById('datetimepicker3')
function checkEndDate(idn) {
  if (endDate.value == "") {
    return false
  }
  return idn.endTime.search(endDate.value.slice(0,7)) != -1
}

endDate.addEventListener("input", (event, arg) => {
  tableData = allData.filter(checkEndDate);
  loadData()
})


// 付息日筛选
const interestDate = document.getElementById('datetimepicker2')
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






