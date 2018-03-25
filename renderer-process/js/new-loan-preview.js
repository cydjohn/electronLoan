const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')


ipcRenderer.send('request-temp-data')
ipcRenderer.on('get-temp-data', (event, arg) => {
    console.log(arg)
    loadData(arg)
})


// 新建页面需要传值
function loadData(loan) {
    const name = document.getElementById("name")
    const idNumber = document.getElementById("id-number")
    const bankAccount = document.getElementById("bank-account")
    const amount = document.getElementById("amount")
    const startTime = document.getElementById("start-time")
    const endTime = document.getElementById("end-time")

    const interest = document.getElementById('interest')
    const interestRate = document.getElementById('interest-rate')
    const tax = document.getElementById('tax')
    const actualInterest = document.getElementById('actual-interest')
    const dailyInterest = document.getElementById('daily-interest')
    const firstPaymentDay = document.getElementById('first-payment-day')
    const secondPaymentDay = document.getElementById('second-payment-day')
    const thirdPaymentDay = document.getElementById('third-payment-day')
    const fourthPaymentDay = document.getElementById('fourth-payment-day')

    name.value = loan.name
    idNumber.value = loan.idNumber
    bankAccount.value = loan.bankAccount
    amount.value = loan.amount
    startTime.value = loan.startTime
    endTime.value = loan.endTime

    interest.value = loan.interest
    interestRate.value = loan.interestRate
    tax.value = loan.tax
    actualInterest.value = loan.actualInterest
    dailyInterest.value = (actualInterest.value / 360).toFixed(2)

    firstPaymentDay.value = loan.firstDay + " " + loan.firstPayment + "￥"
    var restInterest = loan.restPayment
    secondPaymentDay.value = loan.secondDay + " " + restInterest + "￥"
    thirdPaymentDay.value = loan.thirdDay + " " + restInterest + "￥"
    fourthPaymentDay.value = loan.fourthDay + " " + restInterest + "￥"

}


const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})


