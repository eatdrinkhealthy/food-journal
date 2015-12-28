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

setEntryFieldValues = function (form, entry, formEntryDate, formBreakfastTime) {
  // set required fields
  entry.set({
    entryDate: formEntryDate,
    caption: form.find('[name=caption]').val()
  });

  // set optional sleep fields   (those with no user entered value, get null)
  entry.set({
    'sleep.hours': form.find('[name=sleep-hours]').val() || null,
    'sleep.quality': form.find('[name=sleep-quality]').val() || null
  });

  // set optional breakfast fields   (those with no user entered value, get null)
  entry.set({
    'breakfast.food': form.find('[name=breakfast-food]').val() || null,
    // if breakfast time has a value, combine with date and save, else set to null
    'breakfast.time': formBreakfastTime && combineTimeWithDate(formBreakfastTime, formEntryDate),
    'breakfast.satisfying': convertYesNoToBooleanOrNull(form.find('[name=breakfast-satisfying]').val()),
    'breakfast.snackAfter': convertYesNoToBooleanOrNull(form.find('[name=breakfast-snack-after]').val()),
    'breakfast.cravings': form.find('[name=breakfast-cravings]').val() || null,
    'breakfast.mood': form.find('[name=breakfast-mood]').val() || null,
    'breakfast.energyLevel': form.find('[name=breakfast-energy-level]').val() || null,
    'breakfast.clarityLevel': form.find('[name=breakfast-clarity-level]').val() || null
  });

  // set optional notes fields
  entry.set({
    'overallFeeling': form.find('[name=overall-feeling]').val() || null,
    'notes': form.find('[name=notes]').val() || null
  });
};
