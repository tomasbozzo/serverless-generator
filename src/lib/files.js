const path = require('path');
const fs = require('fs');

exports.getTemplateFiles = async function(template) {
    return getFiles(`../../templates/${template}`);
};

async function getFiles(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        })
    })
        .then(relativePaths => Promise.resolve(relativePaths.map(relativePath => { return {root: path, relativePath };})))
        .then(files => Promise.all(files.map(file => getFileInfo(file))));
}

async function getFileInfo(file) {
    return new Promise((resolve, reject) => {
        fs.lstat(file.root + '/' + file.relativePath, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                const result = { ...file, isDirectory: () => stats.isDirectory() };
                if (result.isDirectory()) {

                } else {
                    resolve(result);
                }
            }
        })
    });
}

exports.getTemplateFiles('frontend')
    .then(files => {
        files.forEach(f => console.log(f));
    });
