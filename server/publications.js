Meteor.publish('journalEntries', function (jeLimit) {
    check (jeLimit, Number);

    return JournalEntries.find({ownerId: this.userId},
        {sort: {entryDate: -1}, limit: jeLimit});
});

Meteor.publish('singleJournalEntry', function (id) {
    check(id, String);

    return JournalEntries.find(id);
});

Meteor.publish('userEntryDateList', function () {
    check(this.userId, String);

    return JournalEntries.find({ownerId: this.userId}, {fields: {entryDate: 1}});
});
