# sonarqube-scanner


sonarqube-scanner is npm package for [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)

## Installation

`yarn add sonarqube-scanner-node`

## Usage

This package allows you to use same command line parameters and properties file [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) allows.

sonar-scanner-node can be added to node scripts as follows. 

```javascript  
 "scripts": {
    "sonarqube": "sonarqube-scanner-node -Dsonar.login=<token>",
  }
  ```
  
  