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

JournalEntries.getCurrentUserEntry = function (currDate) {
    // strip off time, check only m d y
    var mdyDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    return this.findOne({ownerId: Meteor.userId(), entryDate: mdyDate});
};

JournalEntries.userJournalEntryExists = function (currDate) {
    // This method is a little redundant. Originally was intending this to be a
    // server side call (Method), so could use for routes without subscriptions. But instead
    // stuck with relying on a subscription. A candidate to refactor and remove at some point.

    // strip off time, check only m d y
    var mdyDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());

    return this.find({ownerId: Meteor.userId(), entryDate: mdyDate}).count() > 0;
};

JournalEntries.existingEntryDatesList = function () {
    // return an array of existing journal entry dates (formatted for date picker)
    return this.find().map(function (entry) {
        return dateDatePickerFormat(entry.entryDate);
    });
};

JournalEntries.moodList = ['calm', 'happy', 'depressed', 'anxious', 'sad', 'angry'];

JournalEntries.sleepQualityList = ['light', 'restless', 'deep', 'wake up frequently'];

Sleep = Astro.Class({
    name: 'Sleep',
    fields: {
        hours: {
            type: 'number',
            optional: true,
            validator: Validators.and([
                Validators.number(),
                Validators.gte(0),
                Validators.lte(72)
            ])
        },
        quality: {
            type: 'string',
            optional: true,
            validator: Validators.and([
                Validators.string(),
                Validators.choice(JournalEntries.sleepQualityList)
            ])
        }
    }
});

Details = Astro.Class({
    name: 'Details',
    fields: {
        food: {
            type: 'string',
            optional: true,
            validator: Validators.string()
        },
        time: {
            type: 'date',
            optional: true,
            validator: Validators.date()
        },
        satisfying: {
            type: 'boolean',
            optional: true,
            validator: Validators.boolean()
        },
        snackAfter: {
            type: 'boolean',
            optional: true,
            validator: Validators.boolean()
        },
        cravings: {
            type: 'string',
            optional: true,
            validator: Validators.string()
        },
        mood: {
            type: 'string',
            optional: true,
            validator: Validators.and([
                Validators.string(),
                Validators.choice(JournalEntries.moodList)
            ])
        },
        energyLevel: {
            type: 'number',
            optional: true,
            validator: Validators.and([
                Validators.number(),
                Validators.gte(1),
                Validators.lte(10)
            ])
        },
        clarityLevel: {
            type: 'number',
            optional: true,
            validator: Validators.and([
                Validators.number(),
                Validators.gte(1),
                Validators.lte(10)
            ])
        }
    }
});

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
        },

        sleep: {
            type: 'object',
            optional: true,
            nested: 'Sleep',
            validator: Validators.object(),
            default: function() { return {}; }
        },

        breakfast: {
            type: 'object',
            optional: true,
            nested: 'Details',
            validator: Validators.object(),
            default: function() { return {}; }
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
