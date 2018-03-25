// import { start } from 'repl';

const { ipcRenderer } = require('electron');
var moment = require('moment');
const path = require('path')
const { BrowserWindow } = require('electron').remote

const btn = document.getElementById("add-new")
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

let canSubmit = false
var loan = {}
btn.addEventListener('click', () => {
    if (canSubmit) {

        loan.name = name.value
        loan.idNumber = idNumber.value
        loan.bankAccount = bankAccount.value
        loan.amount = amount.value
        loan.startTime = startTime.value
        loan.endTime = endTime.value

        loan.interest = interest.value
        loan.interestRate = interestRate.value
        loan.tax = tax.value
        loan.actualInterest = actualInterest.value

        // 打印预览
        const modalPath = path.join('file://', __dirname, '../../sections/windows/new-loan-preview.html')
        let win = new BrowserWindow({ width: 800, height: 1000 })
        win.on('close', () => { win = null })
        win.loadURL(modalPath)
        win.show()

        ipcRenderer.send('getMsg', loan)
    }
})



// 身份验证
function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
        alert("身份证输入不合法");
        return false;
    }
    return true;
}


idNumber.addEventListener('change', () => {
    canSubmit = isCardNo(idNumber.value)
})

// 银行卡验证
function isBankCard(str) {
    var regex = /^(6222)\d{12}$/;
    if (regex.test(str)) {
        return true;
    }
    else {
        alert("银行卡信息输入不合法");
        return false;
    }
}

bankAccount.addEventListener('change', () => {
    canSubmit = isBankCard(bankAccount.value)
})

// 借款金额验证
function isValidAmount(number) {
    if (number < 1) {
        alert("请输入有效金额")
        return false
    }
    else {
        return true
    }
}

amount.addEventListener('input', () => {
    if (isValidAmount(amount.value)) {
        interest.value = amount.value * interestRate.value / 100
        canSubmit = true
    }
    else {
        canSubmit = false
    }

})

// 税率验证
function isValidTaxRate(number) {
    if (number < 0) {
        alert("请输入有效税率")
        return false
    }
    else {
        return true
    }
}

interestRate.addEventListener('input', () => {
    if (isValidTaxRate(interestRate.value)) {
        interest.value = amount.value * interestRate.value / 100
        canSubmit = true
    }
    else {
        canSubmit = false
    }
})


// 日期验证
function isValidTime(startTime, endTime) {
    var d1 = Date.parse(startTime)
    var d2 = Date.parse(endTime)
    if (d1 > d2) {
        alert("还款时间不能早于借款时间")
        return false
    }
    else {
        return true

    }
}

startTime.addEventListener('input', () => {
    calculatePaymentDate()
})

endTime.addEventListener('change', () => {
    canSubmit = isValidTime(startTime.value, endTime.value)
})

// 计算
tax.addEventListener('input', () => {
    if (tax.value >= 0) {
        actualInterest.value = interest.value - tax.value
        calculatePaymentDate()
    }
    else {
        alert('请输入有效税费')
    }
})


function calculatePaymentDate() {
    var paymentDates = ['3-15', '6-15', '9-15', '12-15']
    var year = startTime.value.slice(0,4)
    for (d in paymentDates) {
        if (moment(startTime.value).isBefore(moment(year+"-"+paymentDates[d], 'YYYY-MM-DD'))) {
            dailyInterest.value = (actualInterest.value / 360).toFixed(2)
            var firstPay = (dailyInterest.value * (moment(paymentDates[d], 'MM-DD').diff(moment(startTime.value), 'days') - 2)).toFixed(2)
            loan.firstDay = year+"-"+ paymentDates[d]
            if(++d == 4) {
                ++year
                d = 0
                
            }
            loan.secondDay = year+"-"+ paymentDates[d]

            if(++d == 4) {
                ++year
                d = 0
                
            }
            loan.thirdDay = year+"-"+ paymentDates[d]

            if(++d == 4) {
                ++year
                d = 0
                
            }
            loan.fourthDay = year+"-"+ paymentDates[d]

            firstPaymentDay.innerHTML = "第一次付息日：" + loan.firstDay + " " + firstPay + "￥"
            var restInterest = ((actualInterest.value - dailyInterest.value * (moment(paymentDates[d], 'MM-DD').diff(moment(startTime.value), 'days') - 2)) / 3).toFixed(2)
            secondPaymentDay.innerHTML = "第二次付息日：" + loan.secondDay + " " + restInterest + "￥"
            thirdPaymentDay.innerHTML = "第三次付息日：" + loan.thirdDay + " " + restInterest + "￥"
            fourthPaymentDay.innerHTML = "第四次付息日：" + loan.fourthDay + " " + restInterest + "￥"
            loan.firstPayment = firstPay
            loan.restPayment = ((actualInterest.value - firstPay) / 3).toFixed(2)
            break
        }
    }
}

