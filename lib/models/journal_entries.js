JournalEntries = new Mongo.Collection('entries');

JournalEntry = Astro.Class({
    name: 'JournalEntry',
    collection: JournalEntries,

    events: {
        beforeSave: function () {
            this.generateSlug();
        }
    },

    fields: {
        entryDate: 'date',
        caption: 'string'
    },

    indexes: {
        entryDate: {
            fields: {
                entryDate: -1
            },
            options: {
                unique: true
            }
        }
    },

    methods: {
        slugFormattedDate: function () {
            return moment(this.entryDate).format('MM-DD-YYYY');
        }
    },

    behaviors: {
        slug: {
            fieldName: null,  // per docs, should be set to null when using a function to generate slug
            // NOTE: per the docs, this methodName is supposed to get called prior to
            // saving the document, but it wasn't working for me. So, for now, hard-wiring
            // it to the 'beforeSave' event.
            methodName: 'slugFormattedDate'
        }
    }
});

Meteor.methods({
    journalEntryInsert: function (entry) {
        // NOTE, added the audit-argument-checks package, and tested adding an entry
        // without doing checks. An exception was thrown, but the insert still succeeded.
        check(Meteor.userId(), String);
        check(entry, JournalEntry);

        entry.save();  // generates slug field, and inserts in to Mongo

        return {
            slug: entry.slug
        };
    }
});