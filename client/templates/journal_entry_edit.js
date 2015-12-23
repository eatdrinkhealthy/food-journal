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

    var formBreakfastTime = $('#breakfast-timepicker-container').data('DateTimePicker').date();
    formBreakfastTime = formBreakfastTime && formBreakfastTime.clone().toDate();

    // Prevent the user from changing the entry date to another existing entry date
    // TODO: move this date check to astronomy validation
    // SIDENOTE: when comparing dates, the '+' prefix operator compares milliseconds
    if (+formEntryDate !== +entry.entryDate && JournalEntries.userJournalEntryExists(formEntryDate)) {
      throwError('An entry for ' + datePickerFormat(formEntryDate) + ' already exists.');
      return $('#entry-datepicker-container').data('DateTimePicker').date(entry.entryDate);
    }

    // set required fields
    entry.set({
      entryDate: formEntryDate,
      caption: $(e.target).find('[name=caption]').val()
    });

    // set optional fields   (those with no user entered value, get null)
    entry.set({
      'sleep.hours': $(e.target).find('[name=sleep-hours]').val() || null,
      'sleep.quality': $(e.target).find('[name=sleep-quality]').val() || null,
      'breakfast.food': $(e.target).find('[name=breakfast-food]').val() || null,
      // if breakfast time has a value, combine with date and save, else set to null
      'breakfast.time': formBreakfastTime && combineTimeWithDate(formBreakfastTime, formEntryDate),
      'breakfast.satisfying': convertYesNoToBooleanOrNull($(e.target).find('[name=breakfast-satisfying]').val()),
      'breakfast.snackAfter': convertYesNoToBooleanOrNull($(e.target).find('[name=breakfast-snack-after]').val())
    });

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
