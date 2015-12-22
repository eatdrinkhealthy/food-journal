JournalEntryListController = RouteController.extend({
    template: 'journalEntry_list',
    increment: 5,

    journalEntriesLimit: function () {
        return parseInt(this.params.limit) || this.increment;
    },

    subscriptions: function () {
        this.journalEntriesSub = Meteor.subscribe('journalEntries', this.journalEntriesLimit());
    },

    journalEntries: function () {
        return JournalEntries.find({}, {sort: {entryDate: -1}});
    },

    data: function () {
        var hasMore = this.journalEntries().count() === this.journalEntriesLimit();
        var nextPath = this.route.path({limit: this.journalEntriesLimit() + this.increment});

        return {
            journalEntries: this.journalEntries(),
            ready: this.journalEntriesSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});
