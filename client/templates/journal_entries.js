Template.journalEntriesList.helpers({
    journalEntries: function () { return JournalEntries.find({}, {sort: {entryDate: -1}}); }
});
