if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const uploadDateToBucket = require("./storage");
const {getAllUsers, getAllRoles} = require("./api");

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.backup = async (req, res) => {
    console.log("Starting backup of users");
    const users = await backupUsers();

    console.log("Starting backup of roles");
    const roles = await backupRoles();

    const result = `Finished. backupUsers: ${(users ? "Successful" : "Failed")}, backupRoles: ${(roles ? "Successful" : "Failed")}`;
    console.log(result);
    res.send(result);
};

async function backupUsers() {
    let [userSuccess, users] = await getAllUsers();
    if (!userSuccess) {
        console.error("Failed to retrieve user list");
        return false;
    }
    console.log(`Retrieved ${users.length} user/s`);

    const fileName = `users-${(new Date).toISOString()}.json`

    const usersUploadSuccess = uploadDateToBucket(fileName, users);
    if (!usersUploadSuccess) {
        console.error(`Failed to upload ${fileName} to bucket`);
        return false;
    }

    return true;
}

async function backupRoles() {
    const [roleSuccess, roles] = await getAllRoles();
    if (!roleSuccess) {
        console.error("Failed to retrieve role list");
        return false;
    }
    console.log(`Retrieved ${roles.length} role/s`);

    const fileName = `roles-${(new Date).toISOString()}.json`

    const rolesUploadSuccess = uploadDateToBucket(fileName, roles);
    if (!rolesUploadSuccess) {
        console.error(`Failed to upload ${fileName} to bucket`);
        return false;
    }

    return true;
}