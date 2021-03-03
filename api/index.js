const axios = require("axios");

let {BLAISE_API_URL} = process.env;


function getAllUsers() {
    return new Promise(resolve => {
        axios.get("http://" + BLAISE_API_URL + "/api/v1/users")
            .then(function (response) {
                const data = response.data;

                resolve([true, data])
            })
            .catch(function () {
                resolve([false, []])
            });
    });
}

function getAllRoles() {
    return new Promise(resolve => {
        axios.get("http://" + BLAISE_API_URL + "/api/v1/userroles")
            .then(function (response) {
                const data = response.data;

                resolve([true, data])
            })
            .catch(function () {
                resolve([false, []])
            });
    });
}

module.exports = {getAllUsers, getAllRoles}