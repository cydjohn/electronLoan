var grunt = require("grunt");
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: './out/借款系统-win32-ia32',
            outputDirectory: '/installer64',
            authors: 'cyd',
            exe: '借款系统.exe'
          },
        ia32: {
            appDirectory: './out/借款系统-win32-ia32',
            outputDirectory: '/installer32',
            authors: 'cyd',
            exe: '借款系统.exe',
            description:"借款系统",
        }       
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);