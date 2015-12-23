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

convertYesNoToBooleanOrNull = function (valStr) {
  // 'yes' is true, else false   (case insensitive comparison)
  var lowerCaseStr = valStr.toLowerCase();

  var boolVal = null;

  if (lowerCaseStr === 'yes') {
    boolVal = true;
  } else if (lowerCaseStr === 'no') {
    boolVal = false;
  }

  return boolVal;
};

convertBooleanToYesNoEmpty = function (boolVal) {
  var yesNoEmptyStr = '';  // default for null / not set

  if (boolVal === true) {
    // if explicitly true, return 'yes'
    yesNoEmptyStr = 'yes';
  } else if (boolVal === false) {
    // if explicitly false, return 'no'
    yesNoEmptyStr = 'no';
  }

  return yesNoEmptyStr;
};
