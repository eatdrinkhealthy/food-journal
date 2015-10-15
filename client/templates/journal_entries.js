Template.journalEntriesList.helpers({
    journalEntries: function () {
        return JournalEntries.find();
    }
});

//Template.journalEntry.helpers({
//    formattedDate: function () {
//        return moment(this.entryDate).format('MM-DD-YYYY');
//    }
//});