const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const ENV_FILE = '.production.env';

function setEnvironmentVars(envConfig) {
  Object.keys(envConfig).forEach((k) => {
    if (process.env[k] !== envConfig[k]) {
      console.log(`Setting a new value for environment variable "${k}"`);
    }
    process.env[k] = envConfig[k];
  });
}

function getPath(currDir = __dirname) {
  let res;
  res = path.resolve(currDir, ENV_FILE);
  console.log(`Looking for env file "${res}".`);
  return fs.existsSync(res) ? res : null;
}

function setEnvironmentVarsFromDir(currDir) {
  const envPath = getPath(currDir);
  if (!envPath) {
      console.log(`No env file found.`);
    return;
  }
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  setEnvironmentVars(envConfig);
}

module.exports = {
  setEnvironmentVarsFromDir
};
