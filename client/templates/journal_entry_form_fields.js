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
    //formattedDate: function () {
    //    return dateDatePickerFormat(this.entryDate);
    //},
    formattedDate: function () {
        var dateStr;

        // if editing an existing entry with date, return formatted date
        if (this.entryDate) {
            dateStr = dateDatePickerFormat(this.entryDate);
        } else {
            // if a new, and an entry doesn't exist for today's date,
            // pre-fill date field with today's date (else empty)
            var today = new Date();

            dateStr = JournalEntries.userJournalEntryExists(today) ? '' : dateDatePickerFormat(today);
        }

        return dateStr;
    },

    errorClass: function (field) {
        return !!Session.get('journalEntryFormFieldErrors')[field] ? 'has-error' : '';
    },

    errorMessage: function (field) {
        return Session.get('journalEntryFormFieldErrors')[field];
    },

    sleepQuality: function () {
        return JournalEntries.sleepQualityList;
    },

    selected: function (selectItem) {
        var data = Template.instance().data;
        var entrySleepQuality = '';

        // if editing, get sleep.quality if it's set
        // if creating or edit value was not set, stick with default empty string
        if (data.sleep !== undefined && data.sleep.quality) {
            entrySleepQuality = data.sleep.quality;
        }

        return selectItem === entrySleepQuality ? 'selected' : '';
    }
});

