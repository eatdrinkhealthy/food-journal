Meteor.publish('journalEntries', function (jeLimit) {
    check (jeLimit, Number);

    return JournalEntries.find({ownerId: this.userId},
        {sort: {entryDate: -1}, limit: jeLimit});
});

Meteor.publish('singleJournalEntry', function (id) {
    check(id, String);

    return JournalEntries.find(id);
});
