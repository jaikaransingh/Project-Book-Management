const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidRequestBody = function (data) {
    return Object.keys(data).length > 0;
};

const isValidString = function (input) {
    return /^[a-zA-Z0-9\s\-\.,']+$/u.test(input);
  };
  

const isValidEmail = function (input) {
    return /^[\w\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,}$/
        .test(input);
};

const isValidMobile = function (input) {
    return /^[+]?[0-9]{1,3}?[-\s.]?[(]?\d{1,4}[)]?[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/
        .test(input);
};


const isValidPassword = function (input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return passwordRegex.test(input);
};

const isValidPincode = function (input) {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(input);
};

const isValidPlace = function (input) {
    const placeRegex = /^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/;
    return placeRegex.test(input);
};
const isValidISBN = (ISBN) => {
    const isbnValid= (/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/g)
    return isbnValid.test(ISBN);
}

module.exports.isValid = isValid
module.exports.isValidString = isValidString
module.exports.isValidRequestBody = isValidRequestBody
module.exports.isValidEmail = isValidEmail
module.exports.isValidPassword = isValidPassword
module.exports.isValidMobile = isValidMobile
module.exports.isValidPincode = isValidPincode
module.exports.isValidPlace = isValidPlace
module.exports.isValidISBN = isValidISBN

