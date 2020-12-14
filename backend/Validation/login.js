const valid = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLogin(data){
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username: "";
    data.password = !isEmpty(data.password) ? data.password: "";

    return {errors, isValid: isEmpty(errors),
    };
};