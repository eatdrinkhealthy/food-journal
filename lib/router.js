Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () { return Meteor.subscribe('journalEntries'); }
});

Router.route('/', {name: 'journalEntriesList'});

Router.route('/entries/:_id', {
    name: 'journalEntryPage',
    data: function () { return JournalEntries.findOne(this.params._id); }
});