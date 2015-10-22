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
    // strip off time, check only m d y
    var mdyDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    // by including userId in the find, this function works both on client and server side
    return this.findOne({ownerId: Meteor.userId(), entryDate: mdyDate});
};

JournalEntries.existingEntryDatesList = function () {
    // return an array of existing journal entry dates (formatted for date picker)
    return this.find().map(function (entry) {
        return dateDatePickerFormat(entry.entryDate);
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
