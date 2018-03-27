var electronInstaller = require('electron-winstaller');
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './out/借款系统-win32-ia32',
    outputDirectory: './windows32',
    authors: 'cyd',
    exe: '借款系统.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));