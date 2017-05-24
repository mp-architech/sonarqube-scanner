var path = require('path');
var platform = require('./platform');

const SONAR_SCANNER_CLI_VERSION = '3.0.3.778';
const SONAR_SCANNER_CLI_INSTALL_PATH = path.join(__dirname, '..', 'dist');

const config = {
  sonarqubeScannerVersion: SONAR_SCANNER_CLI_VERSION,
  sonarqubeScannerBaseUrl: 'https://sonarsource.bintray.com/Distribution/sonar-scanner-cli',
  sonarqubeScannerFile: `sonar-scanner-cli-${SONAR_SCANNER_CLI_VERSION}-${platform.name}.zip`,
  installPath: SONAR_SCANNER_CLI_INSTALL_PATH,
  sonarqubeScannerExecutable: path.join(
    SONAR_SCANNER_CLI_INSTALL_PATH,
    `sonar-scanner-${SONAR_SCANNER_CLI_VERSION}-${platform.name}`,
    'bin',
    'sonar-scanner',
    platform.isWin ? '.bat' : ''
  )
};

module.exports = config;