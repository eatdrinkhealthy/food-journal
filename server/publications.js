Meteor.publish('journalEntries', function () {
    return JournalEntries.find({ownerId: this.userId});
});