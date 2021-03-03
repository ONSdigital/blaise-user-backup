const path = require("path");
const {Storage} = require('@google-cloud/storage');

let {PROJECT_ID, BUCKET_NAME} = process.env;

let storageConfig = {
    projectId: PROJECT_ID,
};


if (process.env.NODE_ENV !== "production") {
    console.log("Not Prod: Attempting to use local keys.json file");
    const serviceKey = path.join(__dirname, "../keys.json");
    storageConfig = {
        projectId: PROJECT_ID,
        keyFilename: serviceKey,
    };
}

// Creates a client
const storage = new Storage(storageConfig);
const bucket = storage.bucket(BUCKET_NAME)

async function uploadDateToBucket(fileName, data) {
    return new Promise(resolve => {
        const buffer = JSON.stringify(data)

        const blob = bucket.file(fileName)
        const blobStream = blob.createWriteStream({
            resumable: false
        })
        blobStream.on('finish', () => {
            console.log(`Uploaded file ${fileName} to bucket ${BUCKET_NAME}`)
            resolve(true)
        })
            .on('error', (error) => {
                console.error(error)
                resolve(false)
            })
            .end(buffer)
    });
}

module.exports = uploadDateToBucket