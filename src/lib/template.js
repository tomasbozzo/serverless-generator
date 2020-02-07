const Mustache = require('mustache');
const fs = require('fs');
const readLine = require('readline');

exports.render = function(input, data) {
    return Mustache.render(input, data);
};

exports.renderFile = async function(path, data) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, fileData) => {
            if (err) {
                reject(err);
            } else {
                resolve(Mustache.render(fileData, data));
            }
        })
    })
};


exports.renderFile('../../templates/frontend/package.json', {serviceName: 'chachi'})
    .then(text => console.log(text));
