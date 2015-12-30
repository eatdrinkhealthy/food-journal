Template.journalEntry_edit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentEntryId = this._id;

    var entry = JournalEntries.findOne(currentEntryId);

    // Note, DateTimePicker returns a moment, which needs to be
    // cloned and converted to a javascript date
    //   if datetime input fields are not set, set to null, else set to datetime   (uses '&&' short circuit)
    var formEntryDate = $('#entry-datepicker-container').data('DateTimePicker').date();
    formEntryDate = formEntryDate && formEntryDate.clone().toDate();

    // When editing an existing entry, prevent the user from changing the entry date
    // to another existing entry date
    // TODO: move this date check to astronomy validation
    // SIDENOTE: when comparing dates, the '+' prefix operator compares milliseconds
    if (+formEntryDate !== +entry.entryDate && JournalEntries.userJournalEntryExists(formEntryDate)) {
      throwError('An entry for ' + datePickerFormat(formEntryDate) + ' already exists.');
      return $('#entry-datepicker-container').data('DateTimePicker').date(entry.entryDate);
    }

    setEntryFieldValues($(e.target), entry, formEntryDate);

    if (entry.validateAll()) {
      entry.save(function (error) {
        if (error) {
          throwError('edit save error:' + error.reason);
        } else {
          Router.go('journalEntry_view', {_id: currentEntryId});
        }
      });
    } else {
      Session.set('journalEntryFormFieldErrors', entry.getValidationErrors());
    }
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this journal entry?")) {
      var entry = JournalEntries.findOne(this._id);
      entry.remove();
      Router.go('journalEntry_list');
    }
  }
});
