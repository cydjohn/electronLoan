const { ipcRenderer } = require('electron');


const btn = document.getElementById("add-new")
const name = document.getElementById("name")
const idNumber = document.getElementById("id-number")
const bankAccount = document.getElementById("bank-account")
const amount = document.getElementById("amount")
const startTime = document.getElementById("start-time")
const endTime = document.getElementById("end-time")

let canSubmit = false
btn.addEventListener('click', () => {
    if(canSubmit) {
        ipcRenderer.send('getMsg', "fasdfasdfasdf")
    }
})

ipcRenderer.on('add-new-loan', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`
    console.log(message)
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
    alert("银行卡信息输入不合法");
    return false;
}

bankAccount.addEventListener('change', () => {
    canSubmit =  isBankCard(idNumber.value)
})

// 借款金额验证
function isValidAmount(number) {
    if(number<1) {
        alert("请输入有效金额")
        return false
    }
    else{
        return true
    }
}

amount.addEventListener('change',() => {
    canSubmit =  isValidAmount(amount.value)
})



// 日期验证



