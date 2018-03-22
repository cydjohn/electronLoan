const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
// const newWindowBtn = document.getElementById('new')

let tableData = []
ipcRenderer.on('add-new-loan', (event, arg) => {
  tableData.push(arg)
  // document.getElementById('data').innerHTML += "<tr> <td>1</td> <td>A0001</td> <td>Sachin</td> <td>53023421532542345</td> <td>62212424245345345345</td> <td>2018-01-01</td> <td>2018-03-15</td> <td>2019-01-01</td> <td>10000.00</td> <td>6.3</td> <td>630</td> <td>27.18</td> <td>602.82</td> <td>141.95</td> <td>153.62</td> <td>153.62</td> <td>153.62</td> </tr>";
  loadData()
  document.getElementById('button-table').click()
})


function loadData() {
  document.getElementById('data').innerHTML = ""
  for(d in tableData) {
    document.getElementById('data').innerHTML +=
    "<tr>" +
    "<td>" + int(d)+1 + "</td>" +
    "<td>" + tableData[d].name + "</td>" +
    "<td>" + "A0001" + "</td>" +
    "<td>" + tableData[d].idNumber + "</td>" +
    "<td>" + tableData[d].bankAccount + "</td>" +
    "<td>" + tableData[d].startTime + "</td>" +
    "<td>" + tableData[d].name + "</td>" +
    "<td>" + tableData[d].endTime + "</td>" +
    "<td>" + tableData[d].amount + "</td>" +
    "<td>" + tableData[d].interestRate + "</td>" +
    "<td>" + tableData[d].interest + "</td>" +
    "<td>" + tableData[d].tax + "</td>" +
    "<td>" + tableData[d].actualInterest + "</td>" +
    "<td>" + tableData[d].firstPayment + "</td>" +
    "<td>" + tableData[d].restPayment + "</td>" +
    "<td>" + tableData[d].restPayment + "</td>" +
    "<td>" + tableData[d].restPayment + "</td>"
  }
}


// newWindowBtn.addEventListener('click', () => {
//   const modalPath = path.join('file://', __dirname, '../../sections/windows/new-loan.html')
//   let win = new BrowserWindow({ width: 800, height: 600 })
//   win.on('close', () => { win = null })
//   win.loadURL(modalPath)
//   win.show()
// })





// const n = document.getElementById("new");
// const e = document.getElementById("data");
// n.addEventListener('click', (event) => {
//     e.innerHTML += "<tr><td>1</td><td>A001</td><td>Sachin</td><td>53023421532542345</td><td>62212424245345345345</td><td>2018-01-01</td><td>2019-01-01</td><td>10000.00</td><td>630</td><td>27.18</td><td>602.82</td><td>141.95</td><td>153.62</td><td>153.62</td><td>153.62</td></tr>";
// })
