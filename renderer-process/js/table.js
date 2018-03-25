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


function loadData() {
  document.getElementById('data').innerHTML = ""
  for(d in tableData) {
    document.getElementById('data').innerHTML +=
    "<tr>" +
    "<td>" + (parseInt(d)+1) + "</td>" +
    "<td>" + tableData[d]._id + "</td>" +
    "<td>" + tableData[d].name + "</td>" +
    "<td>" + tableData[d].idNumber + "</td>" +
    "<td>" + tableData[d].bankAccount + "</td>" +
    "<td>" + tableData[d].startTime + "</td>" +
    "<td>" + "2018-06-15"+ "</td>" +
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
}


// 搜索身份证号

const idSearchBox = document.getElementById("srch-term")

function checkId(idn) {
  if(idSearchBox.value == "") {
    return false
  }
  return idn.idNumber.search(idSearchBox.value) != -1
}

idSearchBox.addEventListener("input",()=>{
  tableData = allData.filter(checkId);
  loadData()
})

// 搜索合同号
const contraIdSearchBox = document.getElementById("contra-id")

function checkContractNumber(bn) {
  if(contraIdSearchBox.value == "") {
    return false
  }
  return bn._id.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input",()=>{
  tableData = allData.filter(checkContractNumber);
  loadData()
})



// 打印预览
const printPreview = document.getElementById('print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value',tableData)
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



// 还款日期筛选


// 付息日筛选






