Template.journalEntriesList.helpers({
    journalEntries: function () {
        return JournalEntries.find();
    }
});

Template.journalEntry.helpers({
    formatDate: function (date) {
        return moment(date).format('YYYY-MM-DD');
    }
});