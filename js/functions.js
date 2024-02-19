const stringLength = function (string, maxLength) {
    if (string.length <= maxLength) {
        return 'true'
    } else {
        return 'false'
    }
}

stringLength();

const makePolindromString = function (string) {
    let normalString = string.replaceAll(' ','').toLowerCase();
    let reverseString = '';
    for (let i = normalString.length - 1; i >= 0; i--) {
        reverseString += normalString[i];
    }
    return reverseString === normalString;
} 

makePolindromString();