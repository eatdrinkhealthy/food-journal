Template.journalEntriesList.helpers({
    journalEntries: function () {
        return JournalEntries.find({}, {sort: {entryDate: -1}});
    }
});

Template.journalEntry.helpers({
    formattedDate: function () {
        return moment(this.entryDate).format('MM-DD-YYYY');
    }
});
