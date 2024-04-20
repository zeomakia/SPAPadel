// karma.conf.js
module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
  
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
  
      files: [
        { pattern: './src/test.ts', watched: false }
      ],
  
      // preprocessors: {
      //   './src/test.ts': ['@angular-devkit/build-angular']
      // },
  
      browsers: ['Chrome'],

      customLaunchers: {
        ChromeCustom: {
          base: 'Chrome',
          flags: ['--no-sandbox'], // Si es necesario
          binary: '/ruta/a/google-chrome' // Ruta al ejecutable de Chrome, si no está en la ruta predeterminada
        }
      },
      reporters: ['progress', 'coverage-istanbul'],
      preprocessors:{
        'src/**': ['coverage']
      },
  
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, 'coverage'),
        reports: ['html', 'lcovonly','text-summary'],
        fixWebpackSourcePaths: true
      },
  
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      singleRun: true,
      restartOnFileChange: true
    });
  };