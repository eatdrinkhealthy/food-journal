Meteor.publish('journalEntries', function (jeLimit) {
    check (jeLimit, Number);

    return JournalEntries.find({ownerId: this.userId},
        {sort: {entryDate: -1}, limit: jeLimit});
});