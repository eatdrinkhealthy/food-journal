JournalEntries = new Mongo.Collection('entries');

JournalEntries.allow({
    update: function (userId, journalEntry) {
        return ownsDocument(userId, journalEntry);
    },
    remove: function (userId, journalEntry) {
        return ownsDocument(userId, journalEntry);
    }
});

JournalEntries.deny({
    update: function (userId, journalEntry, fieldNames) {
        // only allow editing of specific fields...
        return (_.without(fieldNames, 'entryDate', 'caption').length > 0);
    }
});

JournalEntries.getUserEntry = function (currDate) {
    // client side (mini-mongo) check (searches current logged in user only)

    // strip off time, check only m d y
    var mdyDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    // by including userId in the find, this function works both on client and server side
    return this.findOne({ownerId: Meteor.userId(), entryDate: mdyDate});
};

JournalEntries.existingEntryDatesList = function () {
    // return an array of existing journal entry dates (formatted for date picker)
    return this.find().map(function (entry) {
        return moment(entry.entryDate).format('M/D/YY');
    });
};

JournalEntry = Astro.Class({
    name: 'JournalEntry',
    collection: JournalEntries,

    fields: {
        ownerId: 'string',

        entryDate: {
            type: 'date',
            validator: Validators.and([
                Validators.required(),
                Validators.date()
            ])
        },

        caption: {
            type: 'string',
            validator: Validators.and([
                Validators.required(),
                Validators.string(),
                Validators.minLength(3)
            ])
        }
    },

    indexes: {
        ownerEntryDate: {
            fields: {
                ownerId: 1,
                entryDate: -1
            },
            options: {
                unique: true
            }
        }
    },

    methods: {
        validateAll: function () {
            // the 'false' param indicates to check all fields (not stop after first error)
            return this.validate(false);
        }
    }
});

Meteor.methods({
    journalEntryInsert: function (entry) {
        check(entry, JournalEntry);

        // Verify an entry for this user and date do not already exist
        var userDateEntry = JournalEntries.getUserEntry(entry.entryDate);
        if (userDateEntry) {
            return {
                entryAlreadyExists: true,
                _id: userDateEntry._id
            }
        }

        entry.set('ownerId', Meteor.userId());  // set owner to current logged in user
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
