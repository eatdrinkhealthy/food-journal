Template.journalEntry_edit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentEntryId = this._id;

        var entry = JournalEntries.findOne(currentEntryId);

        // Prevent the user from changing the entry date to another existing entry date
        // TODO: move this date check to astronomy validation

        // Note, DateTimePicker returns a moment, which needs to be
        // cloned and converted to a javascript date
        var newEntryDate = $('#entry-datepicker').data('DateTimePicker').date().clone().toDate();

        // SIDENOTE: when comparing dates, the '+' prefix operator compares milliseconds
        if (+newEntryDate !== +entry.entryDate && JournalEntries.userJournalEntryExists(newEntryDate)) {
            throwError('An entry for ' + datePickerFormat(newEntryDate) + ' already exists.');
            return $('#entry-datepicker').data('DateTimePicker').date(entry.entryDate);
        }

        // set required fields
        entry.set({
            entryDate: newEntryDate,
            caption: $(e.target).find('[name=caption]').val()
        });

        // set optional fields   (those with no user entered value, get null)
        entry.set({
            'sleep.hours': $(e.target).find('[name=sleep-hours]').val() || null,
            'sleep.quality': $(e.target).find('[name=sleep-quality]').val() || null,
            'breakfast.food': $(e.target).find('[name=breakfast-food]').val() || null
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
