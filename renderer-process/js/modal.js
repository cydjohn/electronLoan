const { ipcRenderer } = require('electron');


const btn = document.getElementById("add-new")
const name = document.getElementById("name")
const idNumber = document.getElementById("id-number")
const bankAccount = document.getElementById("bank-account")
const startTime = document.getElementById("start-time")
const endTime = document.getElementById("end-time")


btn.addEventListener('click', () => {
    ipcRenderer.send('getMsg', "fasdfasdfasdf")
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
    if (!isCardNo(idNumber.value)) {

    }
})

// 银行卡验证
function isBankCard(str) {
    var regex = /^(6222)\d{12}$/;
    if (regex.test(str)) {
        return true;
    }
    alert("银行卡输入不合法");
    return false;
}

bankAccount.addEventListener('change', () => {
    if (!isBankCard(idNumber.value)) {

    }
})


ipcRenderer.on('add-new-loan', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`
    console.log(message)
})