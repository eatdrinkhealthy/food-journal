Meteor.publish('journalEntries', function () {
    return JournalEntries.find();
});