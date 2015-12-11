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

  selected: function (listItem, dataValue) {

    // if the dataValue is not set (not truthy), use an empty string for comparison
    var compareStr = dataValue || '';

    return listItem === compareStr ? 'selected' : '';
  }
});
