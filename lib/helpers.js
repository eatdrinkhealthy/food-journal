datePickerFormat = function (currDate) {
    return moment(currDate).format('M/D/YY');
};

dateListFormat = function (currDate) {
    return moment(currDate).format('MM-DD-YYYY');
};

combineTimeWithDate = function(aTime, aDate) {
  return new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(),
                  aTime.getHours(), aTime.getMinutes());
};

timePickerFormat = function (currTime) {
  return moment(currTime).format('h:mm a');
};
