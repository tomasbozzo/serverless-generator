const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const clear = require('clear');
const clui = require('clui');
const Spinner = clui.Spinner;

const {checkGoogleSdkIsInstalled, checkRepositoryIsAvailable} = require('./actions/googleCloud');

async function init() {
    clear();
    console.log(
        chalk.green(figlet.textSync('Serverless Generator', {horizontalLayout: 'full'}))
    );
}

async function run() {
    return checkGoogleSdkIsInstalled()
        .then(() => console.log(chalk.grey('Google SDK already installed')))
        .then(() => askGlobalOption())
        .then(({answer}) => answer())
        .catch(err => console.log(chalk.red(err)))
}

init()
    .then(() => {
        return run();
    });

async function askGlobalOption() {
    return inquirer.prompt({
        name: 'answer',
        type: 'list',
        choices: ['Create a serverless service', 'Create database', 'Quit'],
        filter: val => {
            switch (val) {
                case 'Create a serverless service':
                    return createServerlessServiceCLI;
                default:
                    return quit;
            }
        },
        message: 'What do you want to do?'
    });
}

async function createServerlessServiceCLI() {
    clear();
    console.log(
        chalk.green(figlet.textSync('Create service', {horizontalLayout: 'full'}))
    );

    return askServiceName()
        .then(serviceName => Promise.resolve({ serviceName }))
        .then(form => askIsFrontend(form))

        .then(form => {
            console.log(form);
        })
}

async function askServiceName() {
    return inquirer.prompt({
        name: 'serviceName',
        type: 'text',
        message: 'How do you want to name the service?'
    })
        .then(({ serviceName }) => checkRepositoryIsAvailable(serviceName))
        .catch(err => {
            console.error(err);
            return askServiceName();
        });
}

async function askIsFrontend(form) {
    return inquirer.prompt({
        name: 'isFrontend',
        type: 'confirm',
        message: 'Is it a frontend service?'
    }).then(({ isFrontend }) => Promise.resolve({ ...form, isFrontend }));
}

async function quit() {
    console.log('bye');
}
