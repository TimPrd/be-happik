
exports.regex = async function (inputRegex, str) {
    var regex = new RegExp(inputRegex);
    return regex.test(str);
}