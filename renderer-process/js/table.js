const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
// const newWindowBtn = document.getElementById('new')

let allData = [{
  name:"cyd",
  contractNumber:"A0001",
  idNumber:"530453199408140920",
  bankAccount:"6222342109485743",
  startTime:"2018-3-20",
  endTime:"2019-3-20",
  amount:"10000",
  interestRate:"6.3",
  tax:"27.18",
  actualInterest:"602.82",
  firstPayment:"141.95",
  restPayment:"153.63",
  interest:"630"
},
{
  name:"zxh",
  contractNumber:"A0002",
  idNumber:"524453199408140920",
  bankAccount:"6222432109485743",
  startTime:"2018-3-20",
  endTime:"2019-3-20",
  amount:"10000",
  interestRate:"6.3",
  tax:"27.18",
  actualInterest:"602.82",
  firstPayment:"141.95",
  restPayment:"153.63",
  interest:"630"
}]

// let tableData = allData
// loadData()


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
    "<td>" + tableData[d].contractNumber + "</td>" +
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
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input",()=>{
  tableData = allData.filter(checkContractNumber);
  loadData()
})



// 打印预览


// const n = document.getElementById("new");
// const e = document.getElementById("data");
// n.addEventListener('click', (event) => {
//     e.innerHTML += "<tr><td>1</td><td>A001</td><td>Sachin</td><td>53023421532542345</td><td>62212424245345345345</td><td>2018-01-01</td><td>2019-01-01</td><td>10000.00</td><td>630</td><td>27.18</td><td>602.82</td><td>141.95</td><td>153.62</td><td>153.62</td><td>153.62</td></tr>";
// })
