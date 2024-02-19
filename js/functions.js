const stringLength = function (string, maxLength) {
   return string.length <= maxLength;
};

stringLength('оченьважныйтекст', 10);

const makePolindromString = function (string) {
    const normalString = string.replaceAll(' ','').toLowerCase();
    let reverseString = '';
    for (let i = normalString.length - 1; i >= 0; i--) {
        reverseString += normalString[i];
    };
    return reverseString === normalString;
};

makePolindromString('топот');