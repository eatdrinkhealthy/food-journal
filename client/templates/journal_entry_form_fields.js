Template.journalEntryFormFields.onCreated(function () {
    Session.set('journalEntryFormFieldErrors', {});
});

Template.journalEntryFormFields.rendered = function() {
    $('#entry-datepicker').datepicker({
        todayBtn: true,
        todayHighlight: true,
        autoclose: true,
        container: '#datepicker-container',
        format: 'm/d/yy',
        datesDisabled: JournalEntries.existingEntryDatesList()
    });
};

Template.journalEntryFormFields.helpers({
    suggestedNewDate: function () {
        // if an entry doesn't exist for today's date, pre-fill date field with today's date (else empty)
        var today = new Date();

        return JournalEntries.userJournalEntryExists(today) ? '' : dateDatePickerFormat(today);
    },

    errorClass: function (field) {
        return !!Session.get('journalEntryFormFieldErrors')[field] ? 'has-error' : '';
    },

    errorMessage: function (field) {
        return Session.get('journalEntryFormFieldErrors')[field];
    },

    sleepQuality: function () {
        return JournalEntries.sleepQualityList;
    }
});

