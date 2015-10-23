Template.journalEntry_create.onCreated(function () {
    Session.set('journalEntryCreateErrors', {});
});

Template.journalEntry_create.rendered = function() {
    $('#entry-create-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntry_create.helpers({
    suggestedNewDate: function () {
        // if an entry doesn't exist for today's date, pre-fill date field with today's date (else empty)
        var today = new Date();
        return JournalEntries.getUserEntry(today) ? '' : dateDatePickerFormat(today);
    },

    errorClass: function (field) {
        return !!Session.get('journalEntryCreateErrors')[field] ? 'has-error' : '';
    },

    errorMessage: function (field) {
        return Session.get('journalEntryCreateErrors')[field];
    }
});

Template.journalEntry_create.events({
    'click .glyphicon': function(e) {
        // NOTE, (per the docs) this functionality should work simply by adding
        // input-group-addon class to the span around the glyph, but wasn't working
        // ...so hard coded it.
        e.preventDefault();
        $('#entry-create-datepicker').datepicker('show');
    },

    'submit form': function (e) {
        e.preventDefault();

        var entry = new JournalEntry();
        entry.set({
            // set all document fields here, except ownerId
            // set ownerId server side for greater security
            entryDate: $('#entry-create-datepicker').datepicker('getDate'),
            caption: $(e.target).find('[name=caption]').val()
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
            return Session.set('journalEntryCreateErrors', entry.getValidationErrors());
        }
    }
});