Template.journalEntry_list.helpers({
    journalEntries: function () {
        return JournalEntries.find({}, {sort: {entryDate: -1}});
    }
});
