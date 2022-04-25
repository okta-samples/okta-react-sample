const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const OKTAENV_FILE = '.okta.env';

function setEnvironmentVars(envConfig) {
  Object.keys(envConfig).forEach((k) => {
    if (process.env[k] !== envConfig[k]) {
      console.log(`Setting a new value for environment variable "${k}"`);
    }
    process.env[k] = envConfig[k];
  });
}

function getPath(currDir = __dirname) {
  let res, prevDir;
  // stop when find testenv file or reach to root dir
  while (!fs.existsSync(res) && currDir !== prevDir)  {
    prevDir = currDir;
    res = path.resolve(currDir, OKTAENV_FILE);
    currDir = path.resolve(currDir, '.');
  }
  return fs.existsSync(res) ? res : null;
}

function setEnvironmentVarsFromTestEnv(currDir) {
  const testEnvPath = getPath(currDir);
  if (!testEnvPath) {
    return;
  }
  const envConfig = dotenv.parse(fs.readFileSync(testEnvPath));
  setEnvironmentVars(envConfig);
}

module.exports = {
  setEnvironmentVarsFromTestEnv
};
