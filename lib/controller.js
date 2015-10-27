JournalEntryListController = RouteController.extend({
    template: 'journalEntry_list',
    increment: 5,

    journalEntriesLimit: function () {
        return parseInt(this.params.limit) || this.increment;
    },

    waitOn: function () {
        return Meteor.subscribe('journalEntries', this.journalEntriesLimit());
    },

    journalEntries: function () {
        return JournalEntries.find();
    },

    data: function () {
        var hasMore = this.journalEntries().count() === this.journalEntriesLimit();
        var nextPath = this.route.path({limit: this.journalEntriesLimit() + this.increment});

        return {
            journalEntries: this.journalEntries(),
            nextPath: hasMore ? nextPath : null
        };
    }
});