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

    setEntryFieldValues($(e.target), entry, formEntryDate);

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
