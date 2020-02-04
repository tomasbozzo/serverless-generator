const spawn = require('child_process').spawn;

async function checkGoogleSdkIsInstalled() {
    return new Promise((resolve, reject) => {
        const process = spawn('gcloud --version', { shell: true });
        process.on('exit', () => {
            resolve();
        });

        process.on('error', err => {
            reject('Google cloud is not installed: Please run "curl https://sdk.cloud.google.com | bash"');
        })
    });
}

exports.checkGoogleSdkIsInstalled = checkGoogleSdkIsInstalled;
