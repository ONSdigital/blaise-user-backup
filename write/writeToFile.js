const jsonexport = require('jsonexport');
fs = require('fs');

BLAISE_API_URL = "localhost:90"

function exportDataToCSV(data, dataName) {
    return new Promise(resolve => {
        jsonexport(data, function (err, csv) {
            if (err) {
                console.log(`Failed to convert data to csv`);
                resolve([false, ""])
                return;
            }

            const fileName = `/tmp/${dataName}-${(new Date).toISOString()}.csv`

            fs.writeFile(fileName, csv, function (err) {
                if (err) {
                    console.log(`Failed to write data to file ${fileName}`);
                    resolve([false, ""])
                    return;
                }
                console.log(`Written ${data.length} ${dataName} to file ${fileName}`);
                resolve([true, fileName])
            });
        });
    });
}

function exportDataToJSON(data, dataName) {
    return new Promise(resolve => {
        const fileName = `/tmp/${dataName}-${(new Date).toISOString()}.json`
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                console.log(`Failed to write data to file ${fileName}`);
                resolve([false, ""])
                return;
            }
            console.log(`Written ${data.length} ${dataName} to file ${fileName}`);
            resolve([true, fileName])
        });
    });
}

module.exports = {exportDataToCSV, exportDataToJSON}