Meteor.methods({
    journalEntryInsert: function (entry) {
        check(this.userId, String); // make sure a user is logged in
        check(entry, JournalEntry);

        // Verify an entry for this user and date do not already exist
        var userDateEntry = JournalEntries.getUserEntry(entry.entryDate);
        if (userDateEntry) {
            return {
                entryAlreadyExists: true,
                _id: userDateEntry._id
            }
        }

        entry.set('ownerId', this.userId);  // set document owner to current logged in user

        if (!entry.validateAll()) {
            // Send validation errors back to client
            return entry.throwValidationException();
        }

        try {
            entry.save();
        } catch (error) {
            console.log('caught exception: ' + JSON.stringify(error));
            throw new Meteor.Error('creating-journal-entry', 'astronomy save/insert failed');
        }

        return {
            _id: entry._id
        };
    }
});
