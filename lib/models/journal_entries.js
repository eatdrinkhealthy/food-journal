JournalEntries = new Mongo.Collection('entries');

JournalEntries.getUserEntry = function (currDate) {
    // client side (mini-mongo) check (searches current logged in user only)

    // strip off time, check only m d y
    var mdyDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    // by including userId in the find, this function works both on client and server side
    return this.findOne({ownerId: Meteor.userId(), entryDate: mdyDate});
};

JournalEntries.existingEntryDatesList =  function () {
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
        entryDate: 'date',
        caption: 'string'
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
    }
});

Meteor.methods({
    journalEntryInsert: function (entry) {
        check(entry, JournalEntry);

        var userDateEntry = JournalEntries.getUserEntry(entry.entryDate);
        if (userDateEntry) {
            return {
                entryAlreadyExists: true,
                _id: userDateEntry._id
            }
        }

        entry.set('ownerId', Meteor.userId());  // set owner to current logged in user
        entry.save();                           // inserts in to Mongo

        return {
            _id: entry._id
        };
    }
});
