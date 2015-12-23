Template.journalEntryFormFields.onCreated(function () {
  Session.set('journalEntryFormFieldErrors', {});
});

Template.journalEntryFormFields.onRendered(function () {
  $('#entry-datepicker-container').datetimepicker({
    format: 'M/D/YY',
    showTodayButton: true,
    disabledDates: JournalEntries.existingEntryDatesList()
  });

  $('#breakfast-timepicker-container').datetimepicker({
    format: 'h:mm A'
  });
});

Template.journalEntryFormFields.helpers({
  formattedEntryDate: function () {
    var dateStr;

    // if editing an existing entry with date, return formatted date
    if (this.entryDate) {
      dateStr = datePickerFormat(this.entryDate);
    } else {
      // if creating a new entry, and an entry doesn't exist for today's date,
      // pre-fill date field with today's date (else empty)
      var today = new Date();

      dateStr = JournalEntries.userJournalEntryExists(today) ? '' : datePickerFormat(today);
    }

    return dateStr;
  },

  formattedTime: function (time) {
    return time ? timePickerFormat(time) : '';
  },

  errorClass: function (field) {
    return !!Session.get('journalEntryFormFieldErrors')[field] ? 'has-error' : '';
  },

  errorMessage: function (field) {
    return Session.get('journalEntryFormFieldErrors')[field];
  },

  sleepQuality: function () {
    return JournalEntries.sleepQualityList;
  },

  sleepQualitySelected: function (listItem) {

    // if the sleep quality field is not set (undefined or null), use an empty string for comparison
    var compareStr = '';
    if (Template.instance().data.sleep) {
      compareStr = Template.instance().data.sleep.quality || '';
    }

    return listItem === compareStr ? 'selected' : '';
  },

  breakfastSatisfyingSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var breakfastData =Template.instance().data.breakfast;
    if (breakfastData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(breakfastData.satisfying);
    }

    return listItem === compareStr ? 'selected' : '';
  },

  breakfastSnackAfterSelected: function (listItem) {
    // For optional boolean fields, we display them as yes / no / '' so
    // that we can show an empty string if field has not been set
    // (since it is not a required field)

    var compareStr = '';   // default to 'not set' (null)

    var breakfastData =Template.instance().data.breakfast;
    if (breakfastData) {
      // explicitly check for true or false boolean values (as opposed to just truthy/falsy)
      compareStr = convertBooleanToYesNoEmpty(breakfastData.snackAfter);
    }

    return listItem === compareStr ? 'selected' : '';
  }
});
