Template.journalEntry_edit.onCreated(function () {
    Session.set('journalEntryEditErrors', {});
});

Template.journalEntry_edit.rendered = function() {
    $('#entry-edit-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntry_edit.helpers({
    formattedDate: function () {
        return dateDatePickerFormat(this.entryDate);
    },

    errorClass: function (field) {
        return !!Session.get('journalEntryEditErrors')[field] ? 'has-error' : '';
    },

    errorMessage: function (field) {
        return Session.get('journalEntryEditErrors')[field];
    }
});

Template.journalEntry_edit.events({
    'click .glyphicon': function(e) {
        // NOTE, (per the docs) this functionality should work simply by adding
        // input-group-addon class to the span around the glyph, but wasn't working
        // ...so hard coded it.
        e.preventDefault();
        $('#entry-edit-datepicker').datepicker('show');
    },

    'submit form': function(e) {
        e.preventDefault();

        var currentEntryId = this._id;

        var entry = JournalEntries.findOne(currentEntryId);

        // Prevent the user from changing the entry date to another existing entry date
        //      SIDENOTE: when comparing dates, the '+' prefix operator compares milliseconds
        // TODO: move this date check to astronomy validation
        var newEntryDate = $('#entry-edit-datepicker').datepicker('getDate');
        if (+newEntryDate !== +entry.entryDate && JournalEntries.userJournalEntryExists(newEntryDate)) {
            throwError('An entry for ' + dateDatePickerFormat(newEntryDate) + ' already exists.');
            return $('#entry-edit-datepicker').datepicker('setDate', entry.entryDate);
        }

        entry.set({
            entryDate: newEntryDate,
            caption: $(e.target).find('[name=caption]').val(),
            'sleep.hours': $(e.target).find('[name=sleep-hours]').val()
        });

        if (entry.validateAll()) {
            entry.save(function (error) {
                if (error) {
                    throwError('edit save error:' +  error.reason);
                } else {
                    Router.go('journalEntry_view', {_id: currentEntryId});
                }
            });
        } else {
            Session.set('journalEntryEditErrors', entry.getValidationErrors());
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