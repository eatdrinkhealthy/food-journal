JournalEntryListController = RouteController.extend({
    template: 'journalEntry_list',
    increment: 5,

    journalEntriesLimit: function () {
        return parseInt(this.params.limit) || this.increment;
    },

    waitOn: function () {
        return Meteor.subscribe('journalEntries', this.journalEntriesLimit());
    },

    data: function () {
        return {
            journalEntries: JournalEntries.find()
        };
    }
});