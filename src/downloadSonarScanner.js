const fs = require('fs');
const request = require('superagent');
const admZip = require('adm-zip');
const log = require('fancy-log');
const mkdirs = require('mkdirp').sync;
const config = require('./config');

const isJavaInstalled = () => {
  try {
    const result = require('child_process').spawnSync('java', ['-version']).stderr.toString();
    return new RegExp('version ".*"').test(result);
  } catch(err){
    return false;
  }
};

const downloadSonarScanner = () => {
  const hasJava = isJavaInstalled();
  const downloadUrl = hasJava ? config.sonarqubeScannerUrl : config.sonarqubeScannerWithJreUrl;
  try {
    fs.accessSync(config.sonarqubeScannerExecutable, fs.F_OK);
    log.info('Local sonar-scanner exists...skipping download.');
  } catch (e) {
    log.info(`Downloading sonar-scanner:${config.sonarqubeScannerVersion} - ${downloadUrl}...`);
    mkdirs(config.installPath);
    log.info(`installPath: ${config.installPath}`);
    request
        .get(downloadUrl)
        .on('error', (err) => {
          log.error(`Error downloading sonar-scanner: ${err.message}`);
          throw err;
        })
        .pipe(fs.createWriteStream(`${config.installPath}/${config.sonarqubeScannerZip}`))
        .on('finish', () => {
            const zip = new admZip(`${config.installPath}/${config.sonarqubeScannerZip}`);
            zip.extractAllTo(config.installPath, false, true);
            if(!hasJava) {
                fs.renameSync(config.somarqubeWithJreFolder, config.somarqubeFolder);
            }
            log.info('sonar-scanner download complete');
        });
  }
};

downloadSonarScanner();
