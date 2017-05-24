var fs = require('fs');
var path = require('path');
var download = require('download');
var log = require('fancy-log');
var mkdirs = require('mkdirp').sync;
var config = require('./config');

const downloadSonarScanner = () => {
  const downloadUrl = `${config.sonarqubeScannerBaseUrl}/${config.sonarqubeScannerFile}`;
  log(`Checking local sonar-scanner:`);
  try {
    fs.accessSync(config.installPath, fs.F_OK);
    log('Local sonar-scanner exists...skipping download.');
  } catch (e) {
    log(`Downloading sonar-scanner @ ${downloadUrl}...`);
    mkdirs(config.installPath);
    log(`installPath: ${config.installPath}`);
    download(downloadUrl, config.installPath, {extract: true})
      .then(() => {
        log('sonar-scanner download complete');
      })
      .catch((err) => {
          log.error(`Error downloading sonar-scanner: ${err.message}`);
          throw err;
        }
      );
  }
};

downloadSonarScanner();