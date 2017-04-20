exports.trim = function (str)
{
    return str.replace(/(^\s*)|(\s*$)|([\r\n])|(\ +)/g, "");
}

exports.sum = function (arr)
{
    return eval(arr.join("+"))
}