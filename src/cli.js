const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const clear = require('clear');
const clui = require('clui');
const Spinner = clui.Spinner;

const { checkGoogleSdkIsInstalled } = require('./actions/googleCloud');

async function init() {
    clear();
    console.log(
        chalk.green(figlet.textSync('Serverless Generator', { horizontalLayout: 'full' }))
    );
}

async function run() {
    return checkGoogleSdkIsInstalled()
        .then(() => {
            console.log(chalk.grey('Google SDK already installed'));
        })
        .catch(err => {
            console.log(chalk.red(err));
        })
}

init()
    .then(() => {
        return run();
    });

async function ask() {
    return inquirer.prompt({
        name: 'ENV',
        type: 'list',
        choices: ['One', 'Two'],
        message: 'Please choose one or two'
    });
}
