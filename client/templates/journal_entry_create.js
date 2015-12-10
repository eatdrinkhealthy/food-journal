Template.journalEntry_create.events({
    'submit form': function (e) {
        e.preventDefault();

        var entry = new JournalEntry();

        // set all document fields here, except ownerId
        // set ownerId server side for greater security

        // set required fields
        entry.set({
            // Note, DateTimePicker returns a moment, which needs to be
            // cloned and converted to a javascript date
            entryDate: $('#entry-datepicker').data('DateTimePicker').date().clone().toDate(),
            caption: $(e.target).find('[name=caption]').val()
        });

        // set optional fields   (those with no user entered value, get null)
        entry.set({
            'sleep.hours': $(e.target).find('[name=sleep-hours]').val() || null,
            'sleep.quality': $(e.target).find('[name=sleep-quality]').val() || null,
            'breakfast.food': $(e.target).find('[name=breakfast-food]').val() || null
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
