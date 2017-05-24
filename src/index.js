#!/usr/bin/env node

const log = require('fancy-log');
const execute = require('child_process').execFileSync;
const config = require('./config');

const args = process.argv.slice(2);

log(`Executing sonarqube-scanner ${config.sonarqubeScannerExecutable}`);
execute(config.sonarqubeScannerExecutable, args);