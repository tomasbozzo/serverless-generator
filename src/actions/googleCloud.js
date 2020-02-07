const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

async function checkGoogleSdkIsInstalled() {
    return new Promise((resolve, reject) => {
        const process = spawn('gcloud --version', {shell: true});
        process.on('exit', () => {
            resolve();
        });

        process.on('error', err => {
            reject('Google cloud is not installed: Please run "curl https://sdk.cloud.google.com | bash"');
        })
    });
}

exports.checkRepositoryIsAvailable = async function (repositoryName) {
    return getRepositories()
        .then(repositories => {
            return new Promise((resolve, reject) => {
                if (repositories.find(r => r.name === repositoryName)) {
                    reject('The repository already exists');
                } else {
                    resolve(repositoryName);
                }
            });
        });
};

async function getRepositories() {
    return new Promise((resolve, reject) => {
        exec(`gcloud source repos list`, {shell: '/bin/bash'}, (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout
                    .split('\n')
                    .splice(1)
                    .filter(l => l.length > 0)
                    .map(l => {
                        const [name, projectId, url] = l.replace(/ +/g, ' ').split(' ');
                        return {name, projectId, url};
                    }));
            }
        });
    });
}

exports.checkGoogleSdkIsInstalled = checkGoogleSdkIsInstalled;
