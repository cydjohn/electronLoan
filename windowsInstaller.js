var electronInstaller = require('electron-winstaller');
const path = require('path')
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './out/借款系统-win32-ia32',
    outputDirectory: './windows32',
    authors: 'cyd',
    exe: 'electronLoan.exe',
    noMsi: true,
    setupExe: 'ElectronLoanSetup.exe',
    setupIcon: path.join('assets', 'app-icon', 'win', 'app.ico'),
    skipUpdateIcon: true
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));