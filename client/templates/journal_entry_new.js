Template.journalEntry_new.helpers({
    suggestedNewDate: function () {
        // if an entry doesn't exist for today's date, pre-fill date field with today's date (else empty)
        var today = new Date();
        return JournalEntries.getUserEntry(today) ? '' : moment().format('M/D/YY');
    }
});

Template.journalEntry_new.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntry_new.events({
    'click .glyphicon': function(e) {
        // NOTE, (per the docs) this functionality should work simply by adding
        // input-group-addon class to the span around the glyph, but wasn't working
        // ...so hard coded it.
        e.preventDefault();
        $('#entry-datepicker').datepicker('show');
    },

    'submit form': function (e) {
        e.preventDefault();

        var entry = new JournalEntry();
        entry.set({
            // set all document fields here, except ownerId
            // set ownerId server side for greater security
            entryDate: $('#entry-datepicker').datepicker('getDate'),
            caption: $(e.target).find('[name=caption]').val()
        });

        if (entry.validateAll()) {
            Meteor.call('journalEntryInsert', entry, function (error, result) {
                if (error) {
                    return alert(error.reason);
                }

                if (result.entryAlreadyExists) {
                    alert('A journal entry for this date already exists');
                }

                Router.go('journalEntry_view', {_id: result._id});
            });
        } else {
            var errorList = entry.getValidationErrors();
            alert('form errors:' + JSON.stringify(errorList));
        }
    }
});