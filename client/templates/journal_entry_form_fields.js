Template.journalEntryFormFields.onCreated(function () {
  Session.set('journalEntryFormFieldErrors', {});
});

Template.journalEntryFormFields.onRendered(function () {
  $('#entry-datepicker-container').datetimepicker({
    format: 'M/D/YY',
    showTodayButton: true,
    disabledDates: JournalEntries.existingEntryDatesList()
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
  }
});
