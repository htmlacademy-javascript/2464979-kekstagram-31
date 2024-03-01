// Задание 1
const stringLength = function (string, maxLength) {
  return string.length <= maxLength;
};

stringLength('оченьважныйтекст', 10);

// Задание 2
const makePolindromString = function (string) {
  const normalString = string.replaceAll(' ','').toLowerCase();
  let reverseString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString += normalString[i];
  }
  return reverseString === normalString;
};

makePolindromString('топот');

// Задание 3
/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

function getMinutes(time) {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
}

function calcMeetingTime(startTime, endTime, meetingTime, meetingDuration) {
  const minutesStartTime = getMinutes(startTime);
  const minutesEndTime = getMinutes(endTime);
  const minutesMeetingTime = getMinutes(meetingTime);
  if (minutesMeetingTime < minutesStartTime) {
    return false;
  } if (minutesMeetingTime >= minutesEndTime) {
    return false;
  } if (minutesEndTime - minutesMeetingTime >= meetingDuration) {
    return true;
  } else {
    return false;
  }
}

calcMeetingTime('8:00', '17:30', '14:00', 90);// true
calcMeetingTime('8:0', '10:0', '8:0', 120);// true
calcMeetingTime('08:00', '14:30', '14:00', 90); // false
calcMeetingTime('14:00', '17:30', '08:0', 90);// false
calcMeetingTime('8:00', '17:30', '08:00', 900); // false
