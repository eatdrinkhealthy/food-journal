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

setEntryFieldValues = function (form, entry, formEntryDate) {
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

  // if datetime input fields are not set, sets to null, else set to datetime   (uses '&&' short circuit)
  var formBreakfastTime = $('#breakfast-timepicker-container').data('DateTimePicker').date();
  formBreakfastTime = formBreakfastTime && formBreakfastTime.clone().toDate();

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

  var formLunchTime = $('#lunch-timepicker-container').data('DateTimePicker').date();
  formLunchTime = formLunchTime && formLunchTime.clone().toDate();

  // set optional lunch fields   (those with no user entered value, get null)
  entry.set({
    'lunch.food': form.find('[name=lunch-food]').val() || null,
    // if lunch time has a value, combine with date and save, else set to null
    'lunch.time': formLunchTime && combineTimeWithDate(formLunchTime, formEntryDate),
    'lunch.satisfying': convertYesNoToBooleanOrNull(form.find('[name=lunch-satisfying]').val()),
    'lunch.snackAfter': convertYesNoToBooleanOrNull(form.find('[name=lunch-snack-after]').val()),
    'lunch.cravings': form.find('[name=lunch-cravings]').val() || null,
    'lunch.mood': form.find('[name=lunch-mood]').val() || null,
    'lunch.energyLevel': form.find('[name=lunch-energy-level]').val() || null,
    'lunch.clarityLevel': form.find('[name=lunch-clarity-level]').val() || null
  });

  var formDinnerTime = $('#dinner-timepicker-container').data('DateTimePicker').date();
  formDinnerTime = formDinnerTime && formDinnerTime.clone().toDate();

  // set optional dinner fields   (those with no user entered value, get null)
  entry.set({
    'dinner.food': form.find('[name=dinner-food]').val() || null,
    // if dinner time has a value, combine with date and save, else set to null
    'dinner.time': formDinnerTime && combineTimeWithDate(formDinnerTime, formEntryDate),
    'dinner.satisfying': convertYesNoToBooleanOrNull(form.find('[name=dinner-satisfying]').val()),
    'dinner.snackAfter': convertYesNoToBooleanOrNull(form.find('[name=dinner-snack-after]').val()),
    'dinner.cravings': form.find('[name=dinner-cravings]').val() || null,
    'dinner.mood': form.find('[name=dinner-mood]').val() || null,
    'dinner.energyLevel': form.find('[name=dinner-energy-level]').val() || null,
    'dinner.clarityLevel': form.find('[name=dinner-clarity-level]').val() || null
  });

  // set optional notes fields
  entry.set({
    'overallFeeling': form.find('[name=overall-feeling]').val() || null,
    'notes': form.find('[name=notes]').val() || null
  });
};
