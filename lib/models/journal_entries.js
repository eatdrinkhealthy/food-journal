JournalEntries = new Mongo.Collection('entries');

JournalEntry = Astro.Class({
    name: 'JournalEntry',
    collection: JournalEntries,
    fields: {
        title: 'string',
        date: 'date'
    }
});