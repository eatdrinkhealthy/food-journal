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
    format: 'LT'
  });
});

Template.journalEntryFormFields.helpers({
  formattedDate: function () {
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

  errorClass: function (field) {
    return !!Session.get('journalEntryFormFieldErrors')[field] ? 'has-error' : '';
  },

  errorMessage: function (field) {
    return Session.get('journalEntryFormFieldErrors')[field];
  },

  sleepQuality: function () {
    return JournalEntries.sleepQualityList;
  },

  selected: function (selectItem) {
    var data = Template.instance().data;
    var entrySleepQuality = '';

    // if editing, get sleep.quality if it's set
    // if creating or edit value was not set, stick with default empty string
    if (data.sleep !== undefined && data.sleep.quality) {
      entrySleepQuality = data.sleep.quality;
    }

    return selectItem === entrySleepQuality ? 'selected' : '';
  }
});
