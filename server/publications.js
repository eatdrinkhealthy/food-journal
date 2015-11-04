Meteor.publish('journalEntries', function (jeLimit) {
    check (jeLimit, Number);

    return JournalEntries.find({ownerId: this.userId},
        {sort: {entryDate: -1}, limit: jeLimit});
});

Meteor.publish('singleJournalEntry', function (id) {
    check(id, String);

    return JournalEntries.find(id);
});

Meteor.publish('userJournalEntryDate', function (entryDate) {
    check(entryDate, Date);

    // strip off time, check only m d y
    var mdyDate = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate());

    return JournalEntries.find({ownerId: this.userId, entryDate: mdyDate});
});
