Template.journalEntry_create.events({
  'submit form': function (e) {
    e.preventDefault();

    var entry = new JournalEntry();

    // set all document fields here, except ownerId
    // set ownerId server side for greater security

    // Note, DateTimePicker returns a moment, which needs to be
    // cloned and converted to a javascript date
    //   if datetime input fields are not set, sets to null, else set to datetime   (uses '&&' short circuit)
    var formEntryDate = $('#entry-datepicker-container').data('DateTimePicker').date();
    formEntryDate = formEntryDate && formEntryDate.clone().toDate();

    var formBreakfastTime = $('#breakfast-timepicker-container').data('DateTimePicker').date();
    formBreakfastTime = formBreakfastTime && formBreakfastTime.clone().toDate();

    // set required fields
    entry.set({
      entryDate: formEntryDate,
      caption: $(e.target).find('[name=caption]').val()
    });

    // set optional fields   (those with no user entered value, get null)
    entry.set({
      'sleep.hours': $(e.target).find('[name=sleep-hours]').val() || null,
      'sleep.quality': $(e.target).find('[name=sleep-quality]').val() || null
    });

    entry.set({
      'breakfast.food': $(e.target).find('[name=breakfast-food]').val() || null,
      // if breakfast time has a value, combine with date and save, else set to null
      'breakfast.time': formBreakfastTime && combineTimeWithDate(formBreakfastTime, formEntryDate),
      'breakfast.satisfying': convertYesNoToBooleanOrNull($(e.target).find('[name=breakfast-satisfying]').val()),
      'breakfast.snackAfter': convertYesNoToBooleanOrNull($(e.target).find('[name=breakfast-snack-after]').val()),
      'breakfast.cravings': $(e.target).find('[name=breakfast-cravings]').val() || null,
      'breakfast.mood': $(e.target).find('[name=breakfast-mood]').val() || null,
      'breakfast.energyLevel': $(e.target).find('[name=breakfast-energy-level]').val() || null,
      'breakfast.clarityLevel': $(e.target).find('[name=breakfast-clarity-level]').val() || null
    });

    if (entry.validateAll()) {
      Meteor.call('journalEntryInsert', entry, function (error, result) {
        if (error) {
          // if there are any validation errors, put those in the entry document/object
          entry.catchValidationException(error);

          return throwError('error from server: ' + JSON.stringify(error));
        }

        if (result.entryAlreadyExists) {
          throwError('A journal entry for this date already exists');
        }

        Router.go('journalEntry_view', {_id: result._id});
      });
    } else {
      return Session.set('journalEntryFormFieldErrors', entry.getValidationErrors());
    }
  }
});
