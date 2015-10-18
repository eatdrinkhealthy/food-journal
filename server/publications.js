Meteor.publish('journalEntries', function () {
    return JournalEntries.find({userId: this.userId});
});