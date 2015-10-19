Template.journalEntrySubmit.helpers({
    suggestedNewDate: function () {
        // if an entry doesn't exist for today's date, pre-fill date field with today's date (else empty)
        return JournalEntries.dateEntryExists(Date.now()) ? '' : moment().format('M/D/YY');
    }
});

Template.journalEntrySubmit.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntrySubmit.events({
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
            userId: Meteor.userId(),
            entryDate: $('#entry-datepicker').datepicker('getDate'),
            caption: $(e.target).find('[name=caption]').val()
        });

        Meteor.call('journalEntryInsert', entry, function (error, result) {
            if (error) {
                return alert(error.reason);
            }

            if (result.entryAlreadyExists) {
                alert('A journal entry for this date already exists');
            }

            Router.go('journalEntryPage', {slug: result.slug});
        });
    }
});